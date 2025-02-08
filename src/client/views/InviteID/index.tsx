import { useEffect } from "react"

export interface InviteIdViewProps {
  inviteId: string
}

export function InviteIdView({ inviteId }: InviteIdViewProps) {
  useEffect(() => {
    // const storedInviteId = window.localStorage.getItem("inviteId")

    window.localStorage.setItem("inviteId", inviteId)
  }, [inviteId])

  return <>{inviteId}</>
}
