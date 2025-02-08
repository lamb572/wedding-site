import { Box, Typography } from "@mui/material"

export default async function ThankYouPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2" component="h1" color="primary">
        Thank You
      </Typography>
    </Box>
  )
}
