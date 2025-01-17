"use client"
import PortableText from "@/client/components/PortableText"
import { Wedding, SaveDate } from "@/sanity"
import { stringInterpolation, TextBlock } from "@/utils/stringInterpolation"
import { useMediaQuery, Card, Stack, Typography } from "@mui/material"

export interface SaveTheDateCardProps
  extends Pick<
    SaveDate,
    "heading" | "backgroundImage" | "context" | "extraInfo"
  > {
  weddingData: Wedding | undefined
}

export default function SaveTheDateCard({
  heading,
  context,
  extraInfo,
  weddingData,
}: SaveTheDateCardProps) {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  return (
    <Card
      raised
      sx={{
        backgroundColor: "#DFE1D5",
        m: 1,
        ...(isSmall && { width: "90%" }),
      }}
    >
      <Stack
        sx={{
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          textAlign: "center",
          border: "2px ridge #576d53",
        }}
        margin={{ xs: 1, sm: 5 }}
        padding={{ xs: 2, sm: 5 }}
        spacing={{ xs: 1, sm: 5 }}
      >
        <Typography
          variant={heading?.typographyVariant}
          component="h1"
          color={heading?.color}
        >
          {stringInterpolation(heading?.string, weddingData)}
        </Typography>
        <Stack
          sx={{
            alignItems: "center",
          }}
        >
          <PortableText
            value={context as TextBlock}
            stringInterpolationData={weddingData}
          />
        </Stack>
        <Typography
          variant={extraInfo?.typographyVariant}
          component="p"
          color={extraInfo?.color}
        >
          {stringInterpolation(extraInfo?.string, weddingData)}
        </Typography>
      </Stack>
    </Card>
  )
}
