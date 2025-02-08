"use server"
import RSVPIdView from "@/client/views/RSVPIdView"
import { getInviteById } from "@/server/Invite"
import { redirect } from "next/navigation"

export interface RSVPIdPageProps {
  params: Promise<{
    inviteId: string
  }>
}

export default async function RSVPIdPage({ params }: RSVPIdPageProps) {
  const inviteId = (await params).inviteId

  const invite = await getInviteById({ inviteId })

  if (!invite) {
    redirect("/invite")
  }

  return <RSVPIdView invite={invite} />
}
