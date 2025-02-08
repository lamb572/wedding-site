"use server"
import mongoDBService from "@/server/mongodb"
import { maskString } from "@/utils/maskString"
import { Invite, inviteSchema } from "./types"

export interface GetInviteByIdParams {
  inviteId?: string
}

export async function getInviteById({
  inviteId,
}: GetInviteByIdParams): Promise<Omit<Invite, "_id"> | undefined> {
  const client = await mongoDBService.client()
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
    const collection = db.collection<Invite>("invites")
    const invite =
      (await collection.findOne({ inviteId: inviteId })) ?? undefined

    return inviteSchema
      .omit({
        _id: true,
      })
      .transform((invite) => {
        return {
          ...invite,
          phoneNumber: maskString(invite.phoneNumber),
        }
      })
      .parse(invite)
  } catch (err: unknown) {
    console.error(err)
  }
}
