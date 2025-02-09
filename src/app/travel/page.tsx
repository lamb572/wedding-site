import GoogleMap from "@/client/components/Map"
import PortableText from "@/client/components/PortableText"
import { getTravelAccommodation } from "@/sanity/server"
import { TextBlock } from "@/utils/stringInterpolation"
import { Box, Typography } from "@mui/material"

export default async function TravelPage() {
  // TODO add dynamic ceremony location
  const travelAccommodation = await getTravelAccommodation()
  const mapOptions: google.maps.MapOptions = {
    center: {
      lat: 50.891999,
      lng: -1.412316,
    },
    zoom: 11,
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2,
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        color="primary"
        sx={{
          fontSize: { xs: "10vw", md: "3.75rem" },
        }}
      >
        {travelAccommodation?.travelHeading}
      </Typography>

      <PortableText
        value={(travelAccommodation?.travelDetails ?? []) as TextBlock}
      />

      <Typography
        variant="h2"
        component="h1"
        color="primary"
        sx={{
          fontSize: { xs: "10vw", md: "3.75rem" },
        }}
      >
        {travelAccommodation?.accommodationHeading}
      </Typography>
      <PortableText
        value={(travelAccommodation?.accommodationDetails ?? []) as TextBlock}
      />
      <GoogleMap />
    </Box>
  )
}
