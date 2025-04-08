import InviteView from "@/client/views/Invite"
import { Box } from "@mui/material"

export interface InvitePageProps {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function InvitePage({ searchParams }: InvitePageProps) {
  const error = (await searchParams).error

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <InviteView error={error} />
      </Box>
    </Box>
  )
}
