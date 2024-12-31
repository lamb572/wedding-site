import PortableText from "@/components/PortableText"
import { BrideAndGroom, client, imageLoader, SaveDate } from "@/sanity"
import { stringInterpolation, TextBlock } from "@/utils/stringInterpolation"
import { Card, Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import { draftMode } from "next/headers"

export default async function SaveTheDatePage() {
  const { isEnabled } = await draftMode()

  const { heading, extraInfo, backgroundImage, context } =
    await client.fetch<SaveDate>(
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

  console.log("test", { context })
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
      <Card
        raised
        sx={{
          backgroundColor: "#DFE1D5",
          // boxShadow: "0 0 10px 5px #8F8665",
          height: "fit-content",
        }}
      >
        <Stack
          sx={{
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            maxWidth: { sm: "320px", md: "480px", lg: "640px" },
            textAlign: "center",
            // height: "100%",
            // borderRadius: 5,
            border: "2px solid #8F8665",
            // backgroundColor: "#DFE1D5",
            // boxShadow: "0 0 10px 5px #8F8665",
          }}
          margin={5}
          padding={5}
          spacing={5}
        >
          <Typography
            variant={heading?.typographyVariant}
            component="h1"
            color={heading?.color}
          >
            {stringInterpolation(heading?.string, brideAndGroomData)}
          </Typography>
          <PortableText
            value={context as TextBlock}
            stringInterpolationData={brideAndGroomData}
          />
          <Typography
            variant={extraInfo?.typographyVariant}
            component="p"
            color={extraInfo?.color}
          >
            {stringInterpolation(extraInfo?.string, brideAndGroomData)}
          </Typography>
        </Stack>
      </Card>
    </Stack>
  )
}
