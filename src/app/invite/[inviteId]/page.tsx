import { InviteIdView } from "@/client/views/InviteID"
import { getGuestByInviteId } from "@/server/getGuestByInviteId"
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

  const guest = await getGuestByInviteId({ inviteId: sanitizedInviteId })

  if (!guest) {
    redirect("/")
  }

  return <InviteIdView inviteId={inviteId} />
}
