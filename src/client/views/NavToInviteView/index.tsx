"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface NavToInviteViewProps {
  page: string
}

export default function NavToInviteView({ page }: NavToInviteViewProps) {
  const router = useRouter()
  useEffect(() => {
    const id = window.localStorage.getItem("inviteId")
    if (id) {
      router.push(`${page}/${id}`)
    } else {
      router.push("/invite")
    }
  }, [router, page])
  return <></>
}
