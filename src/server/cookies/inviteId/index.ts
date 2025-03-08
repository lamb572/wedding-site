"use server"

import { cookies } from "next/headers"
import { CookieKeys } from "../types"

export async function setUserInviteCookie(inviteId: string) {
  const cookieStore = await cookies()
  cookieStore.set(CookieKeys.INVITE, inviteId, {
    secure: true,
    httpOnly: true,
    path: "/",
  })
}
