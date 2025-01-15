import { imageLoader } from "@/sanity"
import { getBrideGroomData, getSaveDate } from "@/sanity/server"
import { Stack } from "@mui/material"
import SaveTheDateCard from "./_components/SaveTheDateCard"

export default async function SaveTheDatePage() {
  const saveDate = await getSaveDate()

  const image = imageLoader({ source: saveDate?.backgroundImage?.asset })

  const brideAndGroomData = await getBrideGroomData()
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
        heading={saveDate?.heading}
        context={saveDate?.context}
        extraInfo={saveDate?.extraInfo}
        brideAndGroomData={brideAndGroomData}
      />
    </Stack>
  )
}
