"use server"
import RSVPIdView from "@/client/views/RSVPIdView"
import { CookieKeys } from "@/server/cookies/types"
import { getInviteById } from "@/server/Invite"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function RSVPIdPage() {
  const cookieStore = await cookies()
  const inviteId = cookieStore.get(CookieKeys.INVITE)?.value

  const invite = await getInviteById({ inviteId })

  if (!invite) {
    redirect("/invite")
  }

  return <RSVPIdView invite={invite} />
}
