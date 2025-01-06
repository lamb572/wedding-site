"use client"
import { disableDraftMode } from "@/app/actions"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

export default function DisableDraftMode() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window !== window.parent ||
      !!window.opener
    ) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [])

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode()
      router.refresh()
    })
  if (loading) {
    return null
  }

  return (
    <div>
      {pending ? (
        "Disabling draft mode..."
      ) : (
        <button type="button" onClick={disable}>
          Disable draft mode
        </button>
      )}
    </div>
  )
}
