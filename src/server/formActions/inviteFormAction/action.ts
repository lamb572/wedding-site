"use server"
import { getInviteById } from "@/server/Invite"

export async function verifyInviteExists(inviteId: string) {
  const invite = await getInviteById({ inviteId })

  return Boolean(invite)
}
