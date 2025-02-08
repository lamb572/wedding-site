"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export interface InviteIdViewProps {
  inviteId: string
}

export function InviteIdView({ inviteId }: InviteIdViewProps) {
  const router = useRouter()
  useEffect(() => {
    window.localStorage.setItem("inviteId", inviteId)
    router.push(`/`)
  }, [inviteId, router])

  return <>{inviteId}</>
}
