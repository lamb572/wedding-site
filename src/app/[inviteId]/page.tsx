import { getGuestByInviteId } from "@/server/getGuestByInviteId"
import { stringSanitize } from "@/utils/stringSanitize"

export interface InviteIDPageProps {
  params: Promise<{
    inviteId: string
  }>
}

export default async function InviteIDPage({ params }: InviteIDPageProps) {
  const inviteId = (await params).inviteId

  const sanitizedInviteId = stringSanitize(inviteId)

  const guest = await getGuestByInviteId({ inviteId: sanitizedInviteId })

  if (guest) {
    // TODO redirect to home with search params
    // have home page add to the  local storage
  }

  return (
    <>
      {inviteId}
      {/* {slug} */}
    </>
  )
}
