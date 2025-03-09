import GoogleMap from "@/client/components/Map"
import PortableText from "@/client/components/PortableText"
import { getTravelAccommodation } from "@/sanity/server"
import { CookieKeys } from "@/server/cookies/types"
import { getInviteById } from "@/server/Invite"
import { TextBlock } from "@/utils/stringInterpolation"
import { Box, Typography } from "@mui/material"
import { cookies } from "next/headers"

export default async function TravelPage() {
  const cookieStore = await cookies()
  const inviteId = cookieStore.get(CookieKeys.INVITE)?.value

  const invite = await getInviteById({ inviteId })
  const travelAccommodation = await getTravelAccommodation()

  const userInvitedToCeremony = invite?.ceremony ?? false

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
      <GoogleMap invitedToCeremony={userInvitedToCeremony} />
    </Box>
  )
}
