"use server"

import { cookies } from "next/headers"
import { CookieKeys } from "../types"

export async function setUserInviteCookie(inviteId: string) {
  const cookieStore = await cookies()
  cookieStore.set(CookieKeys.INVITE, inviteId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 100, // 100 days
    path: "/",
  })
}

export async function getUserInviteCookie() {
  const cookieStore = await cookies()
  return cookieStore.get(CookieKeys.INVITE)
}
