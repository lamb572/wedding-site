import { signIn } from "@/auth"
import { Button } from "@mui/material"

export default function SignIn() {
  return (
    <Button
      variant="contained"
      onClick={async () => {
        "use server"
        await signIn("discord", {
          redirectTo: "/admin",
        })
      }}
    >
      Signin with Discord
    </Button>
  )
}
