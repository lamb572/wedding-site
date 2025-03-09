"use client"
import PortableText from "@/client/components/PortableText"
import { Home, imageLoader, Settings, Wedding } from "@/sanity"
import { stringInterpolation, TextBlock } from "@/utils/stringInterpolation"
import { Button, Stack, Typography } from "@mui/material"
import { format, formatDistanceToNowStrict, isPast } from "date-fns"
import Image from "next/image"
import { useRouter } from "next/navigation"

export interface HomeViewProps {
  homeFields?: Home
  weddingFields?: Wedding
  settingsFields?: Settings
  inviteId?: string
}

export function HomeView({
  homeFields,
  weddingFields,
  settingsFields,
  inviteId,
}: HomeViewProps) {
  const router = useRouter()
  const weddingDate = weddingFields?.date
    ? new Date(weddingFields.date)
    : undefined
  const weddingHappened = weddingDate ? isPast(weddingDate) : false

  const distanceToWedding = weddingDate
    ? formatDistanceToNowStrict(weddingDate, { unit: "day" })
    : ""

  const weddingDistanceMessage = weddingHappened
    ? homeFields?.distanceMessages?.past
    : stringInterpolation(homeFields?.distanceMessages?.upcoming, {
        date: distanceToWedding,
      })

  const date = weddingDate ? format(weddingDate, "do MMMM yyyy") : ""

  const image = imageLoader({ source: homeFields?.image?.asset })

  const cardColor = settingsFields?.card?.backgroundColor ?? "#f6eee3"
  return (
    <Stack
      sx={{
        pl: 1,
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "stretch",
        width: "100%",
        backgroundColor: cardColor,
      }}
    >
      <Stack
        sx={{
          backgroundColor: cardColor,
          borderRadius: "10px",
          gap: 2,
          textAlign: "center",
          flexFlow: "column nowrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          alignContent: "stretch",
          width: "100%",
          paddingTop: 2,
        }}
      >
        <Typography variant="h2" component="h2" color="primary">
          {stringInterpolation(homeFields?.title, weddingFields)}
        </Typography>

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
        <Button
          onClick={() =>
            router.push(inviteId ? "/rsvp" : `/invite?forward=rsvp`)
          }
          size="large"
          variant="outlined"
        >
          <Typography variant="h4" color="primary">
            RSVP
          </Typography>
        </Button>
        <Image
          src={image}
          alt={"home page"}
          width={1024}
          height={200}
          style={{
            objectFit: "cover",
            flexGrow: 1,
            maxHeight: "500px",
            border: "4px solid black",
            borderRadius: "35% 35% 0 0",
          }}
        />
        <Typography variant="h4" component="h3" color="primary">
          {weddingDistanceMessage}
        </Typography>
      </Stack>
    </Stack>
  )
}
