'use server';
import mongoDBService from '@/server/mongodb';
import { captureException } from '@sentry/nextjs';
import { Filter } from 'mongodb';
import { z } from 'zod';
import { Invite, inviteSchema } from '../types';

export async function getInvites(
  filter: Filter<Invite> = {},
): Promise<Omit<Invite, '_id'>[]> {
  try {
    const client = await mongoDBService.client();
    const dbString = process.env.MONGODB_DB;
    if (!dbString) {
      throw new Error('MONGODB_DB is not set');
    }
    const db = await client.db(dbString);
    const collection = db.collection<Invite>('invites');

    const invites = await collection.find(filter).toArray();

    const result = z
      .array(
        inviteSchema.omit({
          _id: true,
        }),
      )
      .safeParse(invites);

    if (!result.success) {
      console.error(result.error);
      return [];
    }

    return result.data ?? [];
  } catch (err: unknown) {
    captureException(err);
    console.error(err);
    return [];
  }
}
