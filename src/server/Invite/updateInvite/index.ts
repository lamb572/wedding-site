"use server"

import mongoDBService from "@/server/mongodb"
import { RSVPForm } from "@/shared"
import { Invite } from "../getInviteById/types"

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
  } catch (err: unknown) {
    console.error(err)
  }
}
