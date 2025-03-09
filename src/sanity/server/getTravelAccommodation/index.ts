import { client } from "@/sanity"
import { TravelAccommodation } from "@/sanity/types"
import { draftMode } from "next/headers"

export async function getTravelAccommodation() {
  try {
    const { isEnabled } = await draftMode()
    const travelAccommodation = await client().fetch<TravelAccommodation>(
      '*[_type == "travelAccommodation"][0]',
      {},
      isEnabled
        ? {
            perspective: "previewDrafts",
            useCdn: false,
            stega: true,
          }
        : undefined
    )
    return travelAccommodation
  } catch (err) {
    console.warn(err)
  }
}
