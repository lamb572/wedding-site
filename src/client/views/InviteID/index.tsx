"use client"
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
