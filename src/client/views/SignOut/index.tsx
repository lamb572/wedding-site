"use client"
import { CircularProgress, Stack } from "@mui/material"
import { useEffect } from "react"
import { signOut } from "@/server/signOut"

export default function SignOutView() {
  useEffect(() => {
    signOut()
  }, [])
  return (
    <Stack
      sx={{
        textAlign: "center",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Stack>
  )
}
