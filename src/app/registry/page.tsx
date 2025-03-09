import { imageLoader } from "@/sanity"
import { getRegistry } from "@/sanity/server/getRegistry"
import { TextBlock } from "@/utils/stringInterpolation"
import { Box, Typography } from "@mui/material"
import { PortableText } from "next-sanity"
import Image from "next/image"
import Link from "next/link"

export default async function RegistryPage() {
  const registry = await getRegistry()

  const qrCode = imageLoader({ source: registry?.qrCode?.asset })

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
        {registry?.registryHeading}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          padding: 2,
          gap: 2,
          backgroundColor: "white",
          borderRadius: 4,
          maxWidth: 600,
        }}
      >
        <PortableText value={(registry?.registryDetails ?? []) as TextBlock} />
      </Box>
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
          style={{}}
        />
        {registry?.registryLink && (
          <Link href={registry?.registryLink} target="_blank">
            {/* <Typography> */}
            Or Click Here
            {/* </Typography> */}
          </Link>
        )}
      </Box>
    </Box>
  )
}
