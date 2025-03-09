"use server"
import mongoDBService from "@/server/mongodb"
import { stringSanitize } from "@/utils/stringSanitize"
import { Invite, rsvpFormSchema } from "../types"

export interface GetInviteByIdParams {
  phone?: string
}

export async function getInviteByPhone({
  phone,
}: GetInviteByIdParams): Promise<Omit<Invite, "_id"> | undefined> {
  try {
    const client = await mongoDBService.client()
    if (!phone) {
      console.error("phone number not passes")
      return undefined
    }
    const sanitizedNumber = stringSanitize(phone)

    const dbString = process.env.MONGODB_DB
    if (!dbString) {
      throw new Error("MONGODB_DB is not set")
    }
    const db = await client.db(dbString)
    const collection = db.collection<Invite>("invites")
    const invite =
      (await collection.findOne({
        "guests.phoneNumber": sanitizedNumber,
      })) ?? undefined

    const result = rsvpFormSchema.safeParse(invite)

    if (!result.success) {
      console.error(result.error)
      return undefined
    }

    return result.data
  } catch (err: unknown) {
    console.error(err)
  }
}
