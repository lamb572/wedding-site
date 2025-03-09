import { getInviteByPhone } from "@/server/Invite/getInviteByPhone"
import { twiml } from "twilio"
import { z } from "zod"

const messageResponseSchema = z.object({
  ToCountry: z.string().optional(),
  ToState: z.string().optional(),
  SmsMessageSid: z.string().optional(),
  NumMedia: z.string().optional(),
  ToCity: z.string().optional(),
  FromZip: z.string().optional(),
  SmsSid: z.string().optional(),
  FromState: z.string().optional(),
  SmsStatus: z.string().optional(),
  FromCity: z.string().optional(),
  Body: z.string().optional(),
  FromCountry: z.string().optional(),
  To: z.string().optional(),
  MessagingServiceSid: z.string().optional(),
  ToZip: z.string().optional(),
  NumSegments: z.string().optional(),
  MessageSid: z.string().optional(),
  AccountSid: z.string().optional(),
  From: z.string().optional(),
  ApiVersion: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const requestBody = await req.text()
    const params = new URLSearchParams(requestBody)
    const parsedBody: Record<string, string> = {}
    params.forEach((value, key) => {
      parsedBody[key] = value
    })

    const parsedResponse = messageResponseSchema.parse(parsedBody)

    if (!process.env.MESSAGE_RESPONSE_WEBHOOK) {
      throw new Error("MESSAGE_RESPONSE_WEBHOOK is not set")
    }

    const invite = await getInviteByPhone({ phone: parsedResponse.From })

    await fetch(process.env.MESSAGE_RESPONSE_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `Received a wedding message`,
        embeds: [
          {
            fields: [
              {
                name: "From",
                value: invite?.guests?.at(0)?.name ?? parsedResponse.From,
              },
              {
                name: "Message",
                value: parsedResponse.Body,
              },
            ],
          },
        ],
      }),
    })

    //   Respond to user
    const messagingResponse = new twiml.MessagingResponse()
    messagingResponse.message("The Robots are coming! Head for the hills!")

    return new Response(messagingResponse.toString(), {
      headers: {
        "Content-Type": "text/xml",
      },
      status: 200,
    })
  } catch (error) {
    console.error(error)
    const requestBody = await req.text()
    await fetch(process.env.MESSAGE_RESPONSE_WEBHOOK ?? "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `Error happened while processing user reply`,
        embeds: [
          {
            fields: [
              {
                name: "body",
                value: requestBody,
              },
            ],
          },
        ],
      }),
    })
    return new Response("An error occurred", {
      status: 500,
    })
  }
}
