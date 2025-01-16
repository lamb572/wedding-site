import { redirect } from "next/navigation"

export default function Home() {
  if (!process.env.NEXT_MAIN_SITE_FLAG) {
    redirect("/save-date")
  }

  return <></>
}
