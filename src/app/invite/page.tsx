import InviteView from "@/client/views/Invite"
import { Box } from "@mui/material"

export default function InvitePage() {
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
        <InviteView />
      </Box>
    </Box>
  )
}
