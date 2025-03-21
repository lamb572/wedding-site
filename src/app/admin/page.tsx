import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Admin() {
  const session = await auth()

  console.log("session", session)
  if (!session?.user) {
    redirect("/admin/signin")
  }
  return (
    <div>
      <h1>Admin</h1>
      <p>Admin page content goes here.</p>
    </div>
  )
}
