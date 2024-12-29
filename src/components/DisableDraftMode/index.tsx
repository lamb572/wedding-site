import { disableDraftMode } from "@/app/actions"
import { useRouter } from "next/router"
import { useTransition } from "react"

export function DisableDraftMode() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  if (window !== window.parent || !!window.opener) {
    return null
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode()
      router.reload()
    })

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
