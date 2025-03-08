"use client"
import { setUserInviteCookie } from "@/server/cookies/inviteId"
import { Box, CircularProgress } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export interface InviteIdViewProps {
  inviteId: string
}

export function InviteIdView({ inviteId }: InviteIdViewProps) {
  const router = useRouter()
  useEffect(() => {
    window.localStorage.setItem("inviteId", inviteId)

    const setId = async () => {
      await setUserInviteCookie(inviteId)
    }
    setId()
    router.push(`/`)
  }, [inviteId, router])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  )
}
