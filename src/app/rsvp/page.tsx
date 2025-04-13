"use server"
import Card from "@/components/Card"
import RSVPView from "@/client/views/RSVPView"
import { getSettings } from "@/sanity/server"
import { CookieKeys } from "@/server/cookies/types"
import { getInviteById } from "@/server/Invite"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function RSVPIdPage() {
  const cookieStore = await cookies()
  const inviteId = cookieStore.get(CookieKeys.INVITE)?.value
  const settings = await getSettings()

  const invite = await getInviteById({ inviteId })

  if (!invite) {
    redirect("/invite")
  }

  return (
    <Card backgroundColor={`${settings?.card?.backgroundColor}`}>
      <RSVPView invite={invite} />
    </Card>
  )
}
