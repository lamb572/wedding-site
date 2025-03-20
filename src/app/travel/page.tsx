import Card from "@/client/components/Card"
import { Container } from "@/client/components/Container"
import GoogleMap from "@/client/components/Map"
import PortableText from "@/client/components/PortableText"
import { getSettings, getTravelAccommodation } from "@/sanity/server"
import { CookieKeys } from "@/server/cookies/types"
import { getInviteById } from "@/server/Invite"
import { TextBlock } from "@/utils/stringInterpolation"
import { Box, Typography } from "@mui/material"
import { cookies } from "next/headers"

export default async function TravelPage() {
  const settings = await getSettings()

  const cookieStore = await cookies()
  const inviteId = cookieStore.get(CookieKeys.INVITE)?.value

  const invite = await getInviteById({ inviteId })
  const travelAccommodation = await getTravelAccommodation()

  const userInvitedToCeremony = invite?.ceremony ?? false

  return (
    <Card backgroundColor={`${settings?.card?.backgroundColor}`}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          color="primary"
          sx={{
            fontSize: { xs: "8vw", md: "3.75rem" },
            textAlign: "center",
          }}
        >
          {travelAccommodation?.travelHeading}
        </Typography>
        <Container
          sx={{
            alignItems: "flex-start",
            textAlign: "initial",
          }}
        >
          <PortableText
            value={(travelAccommodation?.travelDetails ?? []) as TextBlock}
          />
        </Container>

        <Typography
          variant="h2"
          component="h2"
          color="primary"
          sx={{
            fontSize: { xs: "8vw", md: "3.75rem" },
            textAlign: "center",
          }}
        >
          {travelAccommodation?.accommodationHeading}
        </Typography>
        <Container
          sx={{
            alignItems: "flex-start",
            textAlign: "initial",
          }}
        >
          <PortableText
            value={
              (travelAccommodation?.accommodationDetails ?? []) as TextBlock
            }
          />
        </Container>

        <GoogleMap invitedToCeremony={userInvitedToCeremony} />
      </Box>
    </Card>
  )
}
