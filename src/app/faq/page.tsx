import SanityIcon from '@/client/components/SanityIcon';
import Card from '@/components/Card';
import FAQCard from '@/components/FAQCard';
import { getFAQs, getSettings } from '@/sanity/server';
import { Typography } from '@mui/material';

export default async function FAQPage() {
  const faqs = await getFAQs();
  const settings = await getSettings();
  return (
    <Card backgroundColor={`${settings?.card?.backgroundColor}`}>
      <Typography variant="h3" component="h1" color="primary">
        FAQ&apos;s
      </Typography>
      {faqs?.map(({ _id, answer, icon, question }) => {
        return (
          <FAQCard
            key={_id}
            answer={answer}
            question={question}
            icon={<SanityIcon icon={icon} />}
          />
        );
      })}
    </Card>
  );
}
