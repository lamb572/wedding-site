import { BrideAndGroom, client, imageLoader, SaveDate } from "@/sanity"
import { Stack } from "@mui/material"
import { draftMode } from "next/headers"
import SaveTheDateCard from "./_components/SaveTheDateCard"

export default async function SaveTheDatePage() {
  const { isEnabled } = await draftMode()

  const { heading, backgroundImage, context, extraInfo } =
    await client.fetch<SaveDate>(
      `*[_type == "saveDate"][0]`,
      {},
      isEnabled
        ? {
            perspective: "previewDrafts",
            useCdn: false,
            stega: true,
          }
        : undefined
    )

  const image = imageLoader({ source: backgroundImage?.asset })

  const brideAndGroomData = await client.fetch<BrideAndGroom>(
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
  return (
    <Stack
      sx={{
        minHeight: "100dvh",
        backgroundImage: `url(${image})`,
        margin: 0,
        padding: 0,
        height: "100%",
        backgroundRepeat: "repeat-y",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundColor: " #DFE1D5",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <SaveTheDateCard
        heading={heading}
        context={context}
        extraInfo={extraInfo}
        brideAndGroomData={brideAndGroomData}
      />
    </Stack>
  )
}
