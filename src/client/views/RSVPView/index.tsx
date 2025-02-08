"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RSVPView() {
  const router = useRouter()
  useEffect(() => {
    const id = window.localStorage.getItem("inviteId")
    if (id) {
      router.push(`rsvp/${id}`)
    } else {
      router.push("/invite")
    }
  }, [router])
  return <></>
}
