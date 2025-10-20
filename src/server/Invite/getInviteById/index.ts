'use server';
import { stringSanitize } from '@/utils/stringSanitize';
import { captureException } from '@sentry/nextjs';
import { getInvite } from '../getInvite';
import { Invite, rsvpFormSchema } from '../types';

export interface GetInviteByIdParams {
  inviteId?: string;
}

export async function getInviteById({
  inviteId: id,
}: GetInviteByIdParams): Promise<Omit<Invite, '_id'> | undefined> {
  try {
    if (!id) {
      console.error('inviteId is not set');
      return undefined;
    }
    const inviteId = stringSanitize(id);

    if (!inviteId) {
      const noInvite = new Error('Invite Id not sent');
      noInvite.cause = 'Invite id missing frm params';
      captureException(noInvite);
      return undefined;
    }

    const invite = await getInvite({ inviteId });

    const result = rsvpFormSchema.safeParse(invite);

    if (!result.success) {
      captureException(result.error);
      console.error(result.error);
      return undefined;
    }

    return result.data;
  } catch (err: unknown) {
    captureException(err);
    console.error(err);
  }
}
