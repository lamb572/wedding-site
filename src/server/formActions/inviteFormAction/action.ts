"use server"
import { getGuestByInviteId } from "@/server/getGuestByInviteId"

export async function verifyUserExists(inviteId: string) {
  const guest = await getGuestByInviteId({ inviteId })

  return Boolean(guest)
}
