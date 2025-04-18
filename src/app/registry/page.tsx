import Card from "@/components/Card"
import { Container } from "@/components/Container"
import PortableText from "@/client/components/PortableText"
import { imageLoader } from "@/sanity"
import { getSettings } from "@/sanity/server"
import { getRegistry } from "@/sanity/server/getRegistry"
import { TextBlock } from "@/utils/stringInterpolation"
import { Box, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

export default async function RegistryPage() {
  const registry = await getRegistry()
  const settings = await getSettings()

  const qrCode = imageLoader({ source: registry?.qrCode?.asset })

  return (
    <Card backgroundColor={`${settings?.card?.backgroundColor}`}>
      {/* <Box
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
      > */}
      <Typography
        variant="h2"
        component="h1"
        color="primary"
        sx={{
          fontSize: { xs: "10vw", md: "3.75rem" },
        }}
      >
        {registry?.registryHeading}
      </Typography>

      <Container
        sx={
          {
            // maxWidth: { xs: 300, md: 400, lg: 600 },
          }
        }
      >
        <PortableText value={(registry?.registryDetails ?? []) as TextBlock} />
      </Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={qrCode}
          alt={"registry QR Code"}
          width={200}
          height={200}
          priority
          style={{
            aspectRatio: "auto",
            objectFit: "cover",
            maxHeight: "200px",
            minHeight: "200px",
          }}
        />
        {registry?.registryLink && (
          <Link href={registry?.registryLink} target="_blank">
            {/* <Typography> */}
            Or Click Here
            {/* </Typography> */}
          </Link>
        )}
      </Box>
      {/* </Box> */}
    </Card>
  )
}
