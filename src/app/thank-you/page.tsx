import Card from "@/components/Card"
import { imageLoader } from "@/sanity"
import { getSettings } from "@/sanity/server"
import { Box, Typography } from "@mui/material"
import Image from "next/image"

export default async function ThankYouPage() {
  const settings = await getSettings()

  const thankYouImage = imageLoader({
    source: settings?.images?.thankYou?.asset,
  })
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card backgroundColor={`${settings?.card?.backgroundColor}`}>
        <Typography variant="h2" component="h1" color="primary">
          Thank You
        </Typography>
        <Image
          src={thankYouImage}
          alt={"Thank You"}
          width={200}
          height={200}
          priority
          style={{
            alignSelf: "center",
            objectFit: "cover",
            flexGrow: 1,
            maxHeight: "200px",
            border: "4px solid black",
            borderRadius: "35% 35% 0 0",
            aspectRatio: "auto",
            minHeight: "200px",
          }}
        />
      </Card>
    </Box>
  )
}
