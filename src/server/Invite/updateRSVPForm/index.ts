"use server"

import { sendWebhook } from "@/server/discord/sendWebhook"
import mongoDBService from "@/server/mongodb"
import { captureException } from "@sentry/nextjs"
import { Invite, RSVPForm } from "../types"

export async function updateRSVPForm(form: RSVPForm) {
  try {
    const client = await mongoDBService.client()

    const dbString = process.env.MONGODB_DB
    if (!dbString) {
      throw new Error("MONGODB_DB is not set")
    }

    if (!form.inviteId) {
      throw new Error("inviteId is not set")
    }

    const db = client.db(dbString)
    const collection = db.collection<Invite>("invites")

    await collection.updateOne(
      { inviteId: form.inviteId },
      { $set: { ...form } }
    )

    const guests = form.guests ?? []

    const guestFields = guests.map((guest, index) => ({
      name: `Guest - ${index}`,
      value: guest.name ?? "Name missing",
      inline: true,
    }))

    await sendWebhook(process.env.INVITE_UPDATED_WEBHOOK, {
      content: `Updated invite for ${form.inviteId}`,
      embeds: [
        {
          fields: [
            ...guestFields,
            {
              name: "Attending",
              value: form.attending ? "Yes" : "No",
            },
          ],
        },
      ],
    })
  } catch (err: unknown) {
    captureException(err)
    console.error(err)
  }
}
