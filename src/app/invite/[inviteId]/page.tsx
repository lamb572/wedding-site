import { InviteIdView } from "@/client/views/InviteID"
import { getInviteById } from "@/server/Invite"
import { stringSanitize } from "@/utils/stringSanitize"
import { redirect } from "next/navigation"

export interface InviteIDPageProps {
  params: Promise<{
    inviteId: string
  }>
}

export default async function InviteIDPage({ params }: InviteIDPageProps) {
  const inviteId = (await params).inviteId

  const sanitizedInviteId = stringSanitize(inviteId)

  const invite = await getInviteById({ inviteId: sanitizedInviteId })

  if (!invite) {
    redirect("/")
  }

  return <InviteIdView inviteId={inviteId} />
}
