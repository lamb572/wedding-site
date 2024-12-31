"use client"
import PortableText from "@/components/PortableText"
import { BrideAndGroom, SaveDate } from "@/sanity"
import { stringInterpolation, TextBlock } from "@/utils/stringInterpolation"
import { useMediaQuery, Card, Stack, Typography } from "@mui/material"

export interface SaveTheDateCardProps
  extends Pick<
    SaveDate,
    "heading" | "backgroundImage" | "context" | "extraInfo"
  > {
  brideAndGroomData: BrideAndGroom
}

export default function SaveTheDateCard({
  heading,
  context,
  extraInfo,
  brideAndGroomData,
}: SaveTheDateCardProps) {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  return (
    <Card
      raised
      sx={{
        backgroundColor: "#DFE1D5",
        m: 1,
        ...(isSmall && { width: "90%" }),
        width: { xs: "90%", sm: "50%", md: "50%" },
      }}
    >
      <Stack
        sx={{
          backgroundColor: "#DFE1D5",
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
          {stringInterpolation(heading?.string, brideAndGroomData)}
        </Typography>
        <Stack
          sx={{
            alignItems: "center",
          }}
        >
          <PortableText
            value={context as TextBlock}
            stringInterpolationData={brideAndGroomData}
          />
        </Stack>
        <Typography
          variant={extraInfo?.typographyVariant}
          component="p"
          color={extraInfo?.color}
        >
          {stringInterpolation(extraInfo?.string, brideAndGroomData)}
        </Typography>
      </Stack>
    </Card>
  )
}
