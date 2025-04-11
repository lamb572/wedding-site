import { client } from '@/sanity';
import { Wedding } from '@/sanity/types';
import { captureException } from '@sentry/nextjs';
import { draftMode } from 'next/headers';

export async function getWeddingData() {
  try {
    const { isEnabled } = await draftMode();
    const wedding = await client().fetch<Wedding>(
      '*[_type == "wedding"][0]',
      {},
      isEnabled
        ? {
            perspective: 'previewDrafts',
            useCdn: false,
            stega: true,
          }
        : undefined,
    );
    return wedding;
  } catch (err) {
    captureException(err);
    console.warn(err);
  }
}
