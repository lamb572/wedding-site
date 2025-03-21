import SignIn from "@/components/SignIn"
import CloseIcon from "@mui/icons-material/Close"
import { Box, Dialog, IconButton } from "@mui/material"
import { redirect } from "next/navigation"

export default async function SignInModal() {
  const handleClose = () => {
    redirect("../")
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
        <SignIn />
      </Box>
    </Dialog>
  )
}
