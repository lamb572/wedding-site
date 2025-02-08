"use server"

import mongoDBService from "@/server/mongodb"
import { RSVPForm } from "@/shared"
import { Guest } from "../getGuestByInviteId/types"

export async function updateGuest(guest: RSVPForm) {
  try {
    const client = await mongoDBService.client()

    const dbString = process.env.MONGODB_DB
    if (!dbString) {
      throw new Error("MONGODB_DB is not set")
    }

    if (!guest.inviteId) {
      throw new Error("inviteId is not set")
    }

    const db = client.db(dbString)
    const collection = db.collection<Guest>("guests")

    await collection.updateOne(
      { inviteId: guest.inviteId },
      { $set: { ...guest } }
    )
  } catch (err: unknown) {
    console.error(err)
  }
}
