"use client"
import LinkBehavior from "@/client/components/Links/LinkBehavior"
import InviteView from "@/client/views/Invite"
import CloseIcon from "@mui/icons-material/Close"
import { Box, Dialog, IconButton } from "@mui/material"

export interface InviteModalProps {
  forward?: string
}

export function Modal({ forward }: InviteModalProps) {
  // const router = useRouter()

  // const handleClose = () => {
  //   if (!forward) {
  //     router.push("/")
  //   } else {
  //     router.push(forward)
  //   }
  // }

  return (
    <Dialog
      open
      // onClose={handleClose}
      sx={{
        minWidth: { sm: "100%", md: "50%" },
        minHeight: { sm: "100%", md: "50%" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: 3,
          paddingTop: 6,
        }}
      >
        <IconButton
          component={LinkBehavior}
          aria-label="close"
          // onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
          // href={forward ?? `/`}
          href="/"
        >
          <CloseIcon />
        </IconButton>
        <InviteView forwardRoute={forward} />
      </Box>
    </Dialog>
  )
}
