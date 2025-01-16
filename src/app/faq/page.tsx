import FAQCard from "@/client/components/FAQCard"
import SanityIcon, { MDIcons } from "@/client/components/SanityIcon"
import { getFAQs } from "@/sanity/server"
import { Stack, Typography } from "@mui/material"

export default async function FAQPage() {
  const faqs = await getFAQs()
  return (
    <Stack>
      <Typography>FAQ&apos;s</Typography>
      {faqs?.map(({ _id, answer, icon, question }) => {
        return (
          <FAQCard
            key={_id}
            answer={answer}
            question={question}
            icon={<SanityIcon name={icon?.name as MDIcons} />}
          />
        )
      })}
    </Stack>
  )
}
