import Card from "@/components/Card"
import SignIn from "@/components/SignIn"
import { getSettings } from "@/sanity/server"
import { Typography } from "@mui/material"

interface SignInPageProps {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const search = await searchParams
  const error = search.error
  const settings = await getSettings()
  return (
    <Card backgroundColor={`${settings?.card?.backgroundColor}`}>
      {error && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
      <SignIn />
    </Card>
  )
}
