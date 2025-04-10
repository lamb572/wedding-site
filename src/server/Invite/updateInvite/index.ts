"use server"
import mongoDBService from "@/server/mongodb"
import { captureException } from "@sentry/nextjs"
import { UpdateFilter } from "mongodb"
import { Invite } from "../types"

interface UpdateInviteParams {
  inviteId?: string
  update: UpdateFilter<Invite>
}

export async function updateInvite({ inviteId, update }: UpdateInviteParams) {
  try {
    const client = await mongoDBService.client()
    const dbString = process.env.MONGODB_DB
    if (!dbString) {
      throw new Error("MONGODB_DB is not set")
    }
    if (!inviteId) {
      throw new Error("inviteId is not set")
    }

    const db = client.db(dbString)
    const collection = db.collection<Invite>("invites")
    const updatedDoc = await collection.updateOne(
      { inviteId: inviteId },
      update
    )

    return updatedDoc
  } catch (err: unknown) {
    captureException(err)
    console.error(err)
    throw err
  }
}
