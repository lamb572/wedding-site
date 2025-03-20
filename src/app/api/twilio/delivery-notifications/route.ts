import { sendWebhook } from "@/server/discord/sendWebhook"
import { updateInvite } from "@/server/Invite"
import { getInviteByPhone } from "@/server/Invite/getInviteByPhone"
import { z } from "zod"

const deliveryNotificationSchema = z.object({
  MessagingServiceSid: z.string().optional(),
  ApiVersion: z.string().optional(),
  MessageStatus: z
    .union([
      z.literal("queued"),
      z.literal("sending"),
      z.literal("sent"),
      z.literal("failed"),
      z.literal("delivered"),
      z.literal("undelivered"),
      z.literal("receiving"),
      z.literal("received"),
      z.literal("accepted"),
      z.literal("scheduled"),
      z.literal("read"),
      z.literal("partially_delivered"),
      z.literal("canceled"),
      z.string(),
    ])
    .optional(),
  SmsSid: z.string().optional(),
  SmsStatus: z.string().optional(),
  To: z.string().optional(),
  From: z.string().optional(),
  MessageSid: z.string().optional(),
  AccountSid: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const requestBody = await req.text()
    const params = new URLSearchParams(requestBody)
    const parsedBody: Record<string, string> = {}
    params.forEach((value, key) => {
      parsedBody[key] = value
    })

    if (!process.env.DELIVERY_NOTIFICATION_WEBHOOK) {
      throw new Error("DELIVERY_NOTIFICATION_WEBHOOK is not set")
    }

    const parsedResponse = deliveryNotificationSchema.parse(parsedBody)

    const invite = await getInviteByPhone({ phone: parsedResponse.To })

    if (!invite) {
      await sendWebhook(process.env.DELIVERY_NOTIFICATION_WEBHOOK, {
        content: `Delivery Notification - invite not found`,
        embeds: [
          {
            fields: [
              {
                name: "To",
                value: `${parsedResponse.To}`,
              },
              {
                name: "Message",
                value: parsedResponse.MessageStatus ?? "Unknown",
              },
            ],
          },
        ],
      })
      return new Response(null, {
        status: 204,
      })
    }

    await updateInvite({
      inviteId: invite?.inviteId,
      update: {
        $addToSet: {
          inviteSentStatus: parsedResponse.MessageStatus,
        },
      },
    })

    const guests = invite?.guests ?? []

    const guestNames =
      guests.map((guest) => guest.name).join(", ") ?? `${parsedResponse.To}`

    await sendWebhook(process.env.DELIVERY_NOTIFICATION_WEBHOOK, {
      content: `Delivery Notification - ${guestNames}`,
      embeds: [
        {
          fields: [
            {
              name: "To",
              value: guestNames,
            },
            {
              name: "Message",
              value: parsedResponse.MessageStatus ?? "Unknown",
            },
          ],
        },
      ],
    })

    return new Response(null, {
      status: 204,
    })
  } catch (error) {
    console.error(error)
  }
}
