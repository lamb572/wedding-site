import { client } from "@/sanity"
import { Settings } from "@/sanity/types"
import { draftMode } from "next/headers"

export async function getSettings() {
  try {
    const { isEnabled } = await draftMode()
    const settings = await client.fetch<Settings>(
      `*[_type == "settings"][0]`,
      {},
      isEnabled
        ? {
            perspective: "previewDrafts",
            useCdn: false,
            stega: true,
          }
        : undefined
    )
    return settings
  } catch (err) {
    console.warn(err)
    return undefined
  }
}
