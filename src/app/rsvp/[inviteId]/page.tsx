"use server"
import RSVPIdView from "@/client/views/RSVPIdView"
import { getGuestByInviteId } from "@/server/Guest"
import { redirect } from "next/navigation"

export interface RSVPIdPageProps {
  params: Promise<{
    inviteId: string
  }>
}

export default async function RSVPIdPage({ params }: RSVPIdPageProps) {
  const inviteId = (await params).inviteId

  const guest = await getGuestByInviteId({ inviteId })

  if (!guest) {
    redirect("/invite")
  }

  return <RSVPIdView guest={guest} />
}
