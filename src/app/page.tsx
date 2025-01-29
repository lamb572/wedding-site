import { HomeView } from "@/client/views"
import { getHome, getSettings, getWeddingData } from "@/sanity/server"
import { redirect } from "next/navigation"

export default async function Home() {
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
    />
  )
}
