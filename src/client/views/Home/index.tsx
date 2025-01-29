"use client"
import PortableText from "@/client/components/PortableText"
import { Home, imageLoader, Wedding } from "@/sanity"
import { stringInterpolation, TextBlock } from "@/utils/stringInterpolation"
import { Button, Stack, Typography } from "@mui/material"
import { format } from "date-fns"
import Image from "next/image"
import { useRouter } from "next/navigation"

export interface HomeViewProps {
  homeFields?: Home
  weddingFields?: Wedding
}

export function HomeView({ homeFields, weddingFields }: HomeViewProps) {
  const router = useRouter()
  const weddingDate = weddingFields?.date
    ? new Date(weddingFields.date)
    : undefined
  // const weddingHappened = weddingDate ? isPast(weddingDate) : false

  // const distanceToWedding = weddingDate
  //   ? formatDistanceToNowStrict(weddingDate, {})
  //   : ""

  // const weddingDistanceMessage = weddingHappened
  //   ? homePageData?.distanceMessages?.past
  //   : stringInterpolation(homePageData?.distanceMessages?.upcoming, {
  //       date: distanceToWedding,
  //     })

  const date = weddingDate ? format(weddingDate, "eeee do MMMM yyyy") : ""

  const image = imageLoader({ source: homeFields?.image?.asset })
  return (
    <Stack
      sx={{
        mt: 0,
        mb: 2,
        mx: 4,
        gap: 2,
        textAlign: "center",
        flexFlow: "column nowrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignContent: "stretch",
        width: "100%",
      }}
    >
      <Typography variant="h2" component="h2" color="textSecondary">
        {stringInterpolation(homeFields?.title, weddingFields)}
      </Typography>
      {/* <Typography variant="h4" component="h3" color="textSecondary">
        {weddingDistanceMessage}
      </Typography> */}

      <Stack
        sx={{
          alignItems: "center",
        }}
      >
        <PortableText
          value={(homeFields?.location ?? []) as TextBlock}
          stringInterpolationData={{ date }}
        />
      </Stack>
      <Button onClick={() => router.push("/rsvp")} size="large" variant="text">
        <Typography variant="h4" color="primary">
          RSVP
        </Typography>
      </Button>
      <Image src={image} alt={"home page"} width={320} height={100} />
    </Stack>
  )
}
