import Card from "@/client/components/Card"
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
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          // py: 4,
          // px: 2,
        }}
      >
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid black",
              pr: 2,
              gap: 2,
              backgroundColor: "white",
              borderRadius: 4,
              textAlign: "initial",
            }}
          >
            <PortableText
              value={(travelAccommodation?.travelDetails ?? []) as TextBlock}
            />
          </Box>

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid black",
              pr: 2,
              gap: 2,
              backgroundColor: "white",
              borderRadius: 4,
              textAlign: "initial",
            }}
          >
            <PortableText
              value={
                (travelAccommodation?.accommodationDetails ?? []) as TextBlock
              }
            />
          </Box>

          <GoogleMap invitedToCeremony={userInvitedToCeremony} />
        </Box>
      </Box>
    </Card>
  )
}
