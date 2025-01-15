import { client } from "@/sanity"
import { BrideAndGroom } from "@/sanity/types"
import { draftMode } from "next/headers"

export async function getBrideGroomData() {
  try {
    const { isEnabled } = await draftMode()
    const brideGroomData = await client.fetch<BrideAndGroom>(
      '*[_type == "brideAndGroom"][0]',
      {},
      isEnabled
        ? {
            perspective: "previewDrafts",
            useCdn: false,
            stega: true,
          }
        : undefined
    )
    return brideGroomData
  } catch (err) {
    console.warn(err)
  }
}
