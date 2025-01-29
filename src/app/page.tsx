import { HomeView } from "@/client/views"
import { getHome, getWeddingData } from "@/sanity/server"
import { redirect } from "next/navigation"

export default async function Home() {
  if (!process.env.NEXT_MAIN_SITE_FLAG) {
    redirect("/save-date")
  }

  const homePageData = await getHome()
  const weddingData = await getWeddingData()

  return <HomeView homeFields={homePageData} weddingFields={weddingData} />
}
