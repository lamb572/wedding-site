import PortableText from "@/client/components/PortableText"
import { getHome, getSettings, getWeddingData } from "@/sanity/server"
import { stringInterpolation, TextBlock } from "@/utils/stringInterpolation"
import { Card, Stack, Typography } from "@mui/material"
import { format, formatDistanceToNowStrict, isPast } from "date-fns"
import { redirect } from "next/navigation"

export default async function Home() {
  if (!process.env.NEXT_MAIN_SITE_FLAG) {
    redirect("/save-date")
  }

  const homePageData = await getHome()
  const weddingData = await getWeddingData()
  const settings = await getSettings()

  const weddingDate = weddingData?.date ? new Date(weddingData.date) : undefined
  const weddingHappened = weddingDate ? isPast(weddingDate) : false

  const distanceToWedding = weddingDate
    ? formatDistanceToNowStrict(weddingDate, {})
    : ""

  const weddingDistanceMessage = weddingHappened
    ? homePageData?.distanceMessages?.past
    : stringInterpolation(homePageData?.distanceMessages?.upcoming, {
        date: distanceToWedding,
      })

  const date = weddingDate ? format(weddingDate, "eee d MMM yy") : ""

  return (
    <Stack
      sx={{
        textAlign: "center",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Card
        raised
        sx={{
          backgroundColor: `${settings?.background?.color}`,
          minHeight: "50%",
          margin: 1,
          padding: 1,
        }}
      >
        <Stack
          sx={{
            padding: 2,
            textAlign: "center",
            justifyContent: "center",
            border: "1px solid grey",
            gap: 2,
            minHeight: "100%",
            whiteSpace: "normal",
          }}
        >
          <Typography variant="h4" component="h2" color="textSecondary">
            {stringInterpolation(homePageData?.title, weddingData)}
          </Typography>
          <Typography variant="h4" component="h3" color="textSecondary">
            {weddingDistanceMessage}
          </Typography>

          <Stack
            sx={{
              alignItems: "center",
            }}
          >
            <PortableText
              value={(homePageData?.location ?? []) as TextBlock}
              stringInterpolationData={{ date }}
            />
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}
