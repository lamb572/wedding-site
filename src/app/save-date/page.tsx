import { BrideAndGroom, client, SaveDate } from "@/sanity"
import stringInterpolation from "@/utils/stringInterpolation"
import Typography from "@mui/material/Typography"
import { draftMode } from "next/headers"

export default async function SaveTheDatePage() {
  const { isEnabled } = await draftMode()

  const { heading, brideAndGroom, date, extraInfo, subheading } =
    await client.fetch<SaveDate>(
      '*[_type == "saveDate"][0]',
      {},
      isEnabled
        ? {
            perspective: "previewDrafts",
            useCdn: false,
            stega: true,
          }
        : undefined
    )

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
    <div>
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
    </div>
  )
}
