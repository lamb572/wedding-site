"use server"
import mongoDBService from "@/server/mongodb"
import { Filter } from "mongodb"
import { Invite } from "../types"

export async function getInvite(
  filter: Filter<Invite>
): Promise<Omit<Invite, "_id"> | undefined> {
  try {
    const client = await mongoDBService.client()
    const dbString = process.env.MONGODB_DB
    if (!dbString) {
      throw new Error("MONGODB_DB is not set")
    }
    const db = await client.db(dbString)
    const collection = db.collection<Invite>("invites")

    const invite = await collection.findOne(filter)

    return invite ?? undefined
  } catch (err: unknown) {
    console.error(err)
  }
}
