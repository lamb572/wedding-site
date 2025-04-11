import { client, Faq } from '@/sanity';
import { captureException } from '@sentry/nextjs';

export async function getFAQs() {
  try {
    const faqs = await client().fetch<Faq[]>(
      '*[_type == "faq"]| order(position asc)',
      {},
    );

    return faqs;
  } catch (err) {
    captureException(err);
    console.warn(err);
    return undefined;
  }
}
