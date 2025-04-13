"use server"
import { stringSanitize } from "@/utils/stringSanitize"
import { captureException } from "@sentry/nextjs"
import { getInvite } from "../getInvite"
import { Invite, rsvpFormSchema } from "../types"

export interface GetInviteByIdParams {
  inviteId?: string
}

export async function getInviteById({
  inviteId: id,
}: GetInviteByIdParams): Promise<Omit<Invite, "_id"> | undefined> {
  try {
    if (!id) {
      console.error("inviteId is not set")
      return undefined
    }
    const inviteId = stringSanitize(id)

    const invite = await getInvite({ inviteId })

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
