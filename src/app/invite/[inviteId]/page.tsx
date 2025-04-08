import { InviteIdView } from "@/client/views/InviteID"
import { getInviteById } from "@/server/Invite"
import { redirect } from "next/navigation"

export interface InviteIDPageProps {
  params: Promise<{
    inviteId: string
  }>
}

export default async function InviteIDPage({ params }: InviteIDPageProps) {
  const inviteId = (await params).inviteId

  const invite = await getInviteById({ inviteId })

  if (!invite) {
    const error = encodeURIComponent("Invite not found")
    redirect(`/invite?error=${error}`)
  }

  return <InviteIdView inviteId={inviteId} />
}
