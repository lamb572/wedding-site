import Card from "@/components/Card"
import SignIn from "@/components/SignIn"
import { getSettings } from "@/sanity/server"

export default async function SignInPage() {
  const settings = await getSettings()
  return (
    <Card backgroundColor={`${settings?.card?.backgroundColor}`}>
      <SignIn />
    </Card>
  )
}
