"use server"
import { getGuestByInviteId } from "@/server/Guest"

export async function verifyUserExists(inviteId: string) {
  const guest = await getGuestByInviteId({ inviteId })

  return Boolean(guest)
}
