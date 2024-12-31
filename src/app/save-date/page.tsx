import { BrideAndGroom, client, imageLoader, SaveDate } from "@/sanity"
import stringInterpolation from "@/utils/stringInterpolation"
import { Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import { draftMode } from "next/headers"

export default async function SaveTheDatePage() {
  const { isEnabled } = await draftMode()

  const {
    heading,
    brideAndGroom,
    date,
    extraInfo,
    subheading,
    backgroundImage,
  } = await client.fetch<SaveDate>(
    `*[_type == "saveDate"][0]`,
    {},
    isEnabled
      ? {
          perspective: "previewDrafts",
          useCdn: false,
          stega: true,
        }
      : undefined
  )

  const image = imageLoader({ source: backgroundImage?.asset })

  const brideAndGroomData = await client.fetch<BrideAndGroom>(
    '*[_type == "brideAndGroom"][0]',
    {},
    isEnabled
      ? {
          perspective: "previewDrafts",
          useCdn: false,
          stega: true,
        }
      : undefined
  )
  return (
    <Stack
      sx={{
        backgroundImage: `url(${image})`,
        margin: 0,
        padding: 0,
        height: "100%",
        backgroundRepeat: " repeat-y",
        backgroundSize: " cover",
        backgroundPosition: " center center",
        backgroundAttachment: " fixed",
        backgroundColor: " #ffffff",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          maxWidth: { sm: "320px", md: "480px", lg: "640px" },
          textAlign: "center",
          height: "100%",
        }}
        margin={5}
        spacing={5}
      >
        <Typography
          variant={heading?.typographyVariant}
          component="h1"
          color={heading?.color}
        >
          {stringInterpolation(heading?.string, brideAndGroomData)}
        </Typography>
        <Typography
          variant={subheading?.typographyVariant}
          component="h2"
          color={subheading?.color}
        >
          {stringInterpolation(subheading?.string, brideAndGroomData)}
        </Typography>
        <Typography
          variant={brideAndGroom?.typographyVariant}
          component="h3"
          color={brideAndGroom?.color}
        >
          {stringInterpolation(brideAndGroom?.string, brideAndGroomData)}
        </Typography>
        <Typography
          variant={date?.typographyVariant}
          component="h4"
          color={date?.color}
        >
          {stringInterpolation(date?.string, brideAndGroomData)}
        </Typography>
        <Typography
          variant={extraInfo?.typographyVariant}
          component="p"
          color={extraInfo?.color}
        >
          {stringInterpolation(extraInfo?.string, brideAndGroomData)}
        </Typography>
      </Stack>
    </Stack>
  )
}
