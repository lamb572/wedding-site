"use server"
import { maskString } from "@/utils/maskString"
import mongoDBService from "../mongodb"
import { Guest, guestSchema } from "./types"

export interface GetGuestByInviteIdParams {
  inviteId?: string
}

export async function getGuestByInviteId({
  inviteId,
}: GetGuestByInviteIdParams): Promise<
  Omit<Guest, "_id" | "inviteId"> | undefined
> {
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

    return guestSchema
      .omit({
        _id: true,
        inviteId: true,
      })
      .transform((guest) => {
        return {
          ...guest,
          phoneNumber: maskString(guest.phoneNumber),
        }
      })
      .parse(guest)
  } catch (err: unknown) {
    console.error(err)
  } finally {
    client.close()
  }
}
