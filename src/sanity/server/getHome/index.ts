import { client, Home } from '@/sanity';
import { captureException } from '@sentry/nextjs';

export async function getHome() {
  try {
    const home = await client().fetch<Home>('*[_type == "home"][0]', {});
    return home;
  } catch (err) {
    captureException(err);
    console.warn(err);
    return undefined;
  }
}
