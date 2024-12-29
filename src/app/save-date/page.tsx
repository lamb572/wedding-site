import { client, SaveDate } from "@/sanity"
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
  return (
    <div>
      <Typography variant={heading?.typographyVariant} component="h1">
        {heading?.string}
      </Typography>
      <Typography variant={subheading?.typographyVariant} component="h2">
        {subheading?.string}
      </Typography>
      <Typography variant={brideAndGroom?.typographyVariant} component="h3">
        {brideAndGroom?.string}
      </Typography>
      <Typography variant={date?.typographyVariant} component="h4">
        {date?.string}
      </Typography>
      <Typography variant={extraInfo?.typographyVariant} component="p">
        {extraInfo?.string}
      </Typography>
    </div>
  )
}
