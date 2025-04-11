import { captureException } from '@sentry/nextjs';
import { client } from '../..';
import { Theme } from '../../types';

export async function getSanityTheme() {
  try {
    const sanityTheme = await client().fetch<Theme | undefined>(
      '*[_type == "theme"][0]',
      {},
    );
    return sanityTheme;
  } catch (err) {
    captureException(err);
    console.warn(err);
    return undefined;
  }
}
