"use server"
import { auth, signOut as so } from "@/auth"
import { redirect } from "next/navigation"

export async function signOut() {
  const session = await auth()

  if (session?.user) {
    so()
  }
  await redirect("/")
}
