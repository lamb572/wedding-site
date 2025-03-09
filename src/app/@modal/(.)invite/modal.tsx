"use client"
import InviteView from "@/client/views/Invite"
import CloseIcon from "@mui/icons-material/Close"
import { Box, Dialog, IconButton } from "@mui/material"
import { useRouter } from "next/navigation"

export interface InviteModalProps {
  forward?: string
}

export function Modal({ forward }: InviteModalProps) {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  return (
    <Dialog
      open
      sx={{
        minWidth: { sm: "100%", md: "50%" },
        minHeight: { sm: "100%", md: "50%" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          pt: 6,
          px: 2,
          pb: 2,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 1,
            top: 1,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <InviteView forwardRoute={forward} />
      </Box>
    </Dialog>
  )
}
