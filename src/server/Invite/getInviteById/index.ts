"use server"
import mongoDBService from "@/server/mongodb"
import { stringSanitize } from "@/utils/stringSanitize"
import { captureException } from "@sentry/nextjs"
import { Invite, rsvpFormSchema } from "../types"

export interface GetInviteByIdParams {
  inviteId?: string
}

export async function getInviteById({
  inviteId: id,
}: GetInviteByIdParams): Promise<Omit<Invite, "_id"> | undefined> {
  try {
    const client = await mongoDBService.client()
    if (!id) {
      console.error("inviteId is not set")
      return undefined
    }
    const inviteId = stringSanitize(id)

    const dbString = process.env.MONGODB_DB
    if (!dbString) {
      throw new Error("MONGODB_DB is not set")
    }
    const db = await client.db(dbString)
    const collection = db.collection<Invite>("invites")
    const invite =
      (await collection.findOne({ inviteId: inviteId })) ?? undefined

    const result = rsvpFormSchema.safeParse(invite)

    if (!result.success) {
      captureException(result.error)
      console.error(result.error)
      return undefined
    }

    return result.data
  } catch (err: unknown) {
    captureException(err)
    console.error(err)
  }
}
