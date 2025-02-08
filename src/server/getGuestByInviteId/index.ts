"use server"
import mongoDBService from "../mongodb"
import { Guest } from "./types"

export interface GetGuestByInviteIdParams {
  inviteId?: string
}

export async function getGuestByInviteId({
  inviteId,
}: GetGuestByInviteIdParams): Promise<Guest | undefined> {
  const client = mongoDBService.initClient()
  try {
    if (!inviteId) {
      console.error("inviteId is not set")
      return undefined
    }

    const dbString = process.env.MONGODB_DB
    if (!dbString) {
      throw new Error("MONGODB_DB is not set")
    }
    const db = client.db(dbString)
    const collection = db.collection<Guest>("guests")
    const guest =
      (await collection.findOne({ inviteId: inviteId })) ?? undefined

    return guest
  } catch (err: unknown) {
    console.error(err)
  } finally {
    client.close()
  }
}
