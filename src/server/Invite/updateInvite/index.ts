"use server"

import mongoDBService from "@/server/mongodb"
import { Invite, RSVPForm } from "../types"
import { sendWebhook } from "@/server/discord/sendWebhook"

export async function updateInvite(invite: RSVPForm) {
  try {
    const client = await mongoDBService.client()

    const dbString = process.env.MONGODB_DB
    if (!dbString) {
      throw new Error("MONGODB_DB is not set")
    }

    if (!invite.inviteId) {
      throw new Error("inviteId is not set")
    }

    const db = client.db(dbString)
    const collection = db.collection<Invite>("invites")

    await collection.updateOne(
      { inviteId: invite.inviteId },
      { $set: { ...invite } }
    )

    const guests = invite.guests ?? []

    const guestFields = guests.map((guest, index) => ({
      name: `Guest - ${index}`,
      value: guest.name ?? "Name missing",
      inline: true,
    }))

    await sendWebhook(process.env.INVITE_UPDATED_WEBHOOK, {
      content: `Updated invite for ${invite.inviteId}`,
      embeds: [
        {
          fields: [
            ...guestFields,
            {
              name: "Attending",
              value: invite.attending ? "Yes" : "No",
            },
          ],
        },
      ],
    })
  } catch (err: unknown) {
    console.error(err)
  }
}
