import { client } from '@/sanity';
import { Schedule } from '@/sanity/types';
import { captureException } from '@sentry/nextjs';

export async function getSchedules() {
  try {
    const faqs = await client().fetch<Schedule[]>(
      '*[_type == "schedule"]| order(time asc)',
      {},
    );

    return faqs;
  } catch (err) {
    captureException(err);
    console.warn(err);
    return undefined;
  }
}
