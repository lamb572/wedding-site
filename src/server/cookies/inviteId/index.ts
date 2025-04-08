"use server"

import { cookies } from "next/headers"
import { CookieKeys } from "../types"

export async function setUserInviteCookie(inviteId: string) {
  const cookieStore = await cookies()
  cookieStore.set(CookieKeys.INVITE, inviteId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: new Date("2023-10-25T23:59:00.000Z"),
    path: "/",
  })
}

export async function getUserInviteCookie() {
  const cookieStore = await cookies()
  return cookieStore.get(CookieKeys.INVITE)
}
