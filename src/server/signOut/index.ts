"use server"
import { getServerSession } from "next-auth/next"
import { authOptionsWithCallbacks } from "@/auth"
import { redirect } from "next/navigation"

export async function signOut() {
  const session = await getServerSession(authOptionsWithCallbacks)

  if (session?.user) {
    redirect("/api/auth/signout")
  }
  redirect("/")
}
