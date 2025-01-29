import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

export const client = () =>
  createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-12-01",
    useCdn: true,
    token: process.env.SANITY_VIEWER_TOKEN,
    stega: {
      studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
    },
  })

export interface ImageProps {
  source?: SanityImageSource
  width?: number
  quality?: number
}

export const imageLoader = ({ source, width, quality }: ImageProps) => {
  const imageBuilder = imageUrlBuilder(client())

  if (!source) return ""
  const image = imageBuilder.image(source)
  if (quality) {
    image.quality(quality)
  }
  if (width) {
    image.width(width)
  }
  return image.url()
}

export * from "./types"
