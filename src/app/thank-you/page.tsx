import Card from "@/client/components/Card"
import { getSettings } from "@/sanity/server"
import { Box, Typography } from "@mui/material"

export default async function ThankYouPage() {
  const settings = await getSettings()
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
      </Card>
    </Box>
  )
}
