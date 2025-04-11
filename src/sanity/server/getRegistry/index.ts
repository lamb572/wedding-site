import { client } from '@/sanity';
import { Registry } from '@/sanity/types';
import { captureException } from '@sentry/nextjs';
import { draftMode } from 'next/headers';

export async function getRegistry() {
  try {
    const { isEnabled } = await draftMode();
    const registry = await client().fetch<Registry>(
      '*[_type == "registry"][0]',
      {},
      isEnabled
        ? {
            perspective: 'previewDrafts',
            useCdn: false,
            stega: true,
          }
        : undefined,
    );
    return registry;
  } catch (err) {
    captureException(err);
    console.warn(err);
  }
}
