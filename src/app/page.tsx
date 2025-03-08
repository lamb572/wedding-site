import { HomeView } from "@/client/views"
import { getHome, getSettings, getWeddingData } from "@/sanity/server"
import { CookieKeys } from "@/server/cookies/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Home() {
  const cookieStore = await cookies()
  const inviteId = cookieStore.get(CookieKeys.INVITE)?.value
  if (!process.env.NEXT_MAIN_SITE_FLAG) {
    redirect("/save-date")
  }

  const homePageData = await getHome()
  const weddingData = await getWeddingData()
  const settingsData = await getSettings()

  return (
    <HomeView
      homeFields={homePageData}
      weddingFields={weddingData}
      settingsFields={settingsData}
      inviteId={inviteId}
    />
  )
}
