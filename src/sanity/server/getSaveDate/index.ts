import { client } from '@/sanity';
import { SaveDate } from '@/sanity/types';
import { captureException } from '@sentry/nextjs';
import { draftMode } from 'next/headers';

export async function getSaveDate() {
  try {
    const { isEnabled } = await draftMode();
    const saveDate = await client().fetch<SaveDate>(
      `*[_type == "saveDate"][0]`,
      {},
      isEnabled
        ? {
            perspective: 'previewDrafts',
            useCdn: false,
            stega: true,
          }
        : undefined,
    );
    return saveDate;
  } catch (err) {
    captureException(err);
    console.warn(err);
    return undefined;
  }
}
