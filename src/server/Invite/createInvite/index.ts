'use server';
import mongoDBService from '@/server/mongodb';
import { captureException } from '@sentry/nextjs';
import { Guests, Invite } from '../types';

interface CreateInviteParams {
  guests: Guests[];
  ceremony: boolean;
}

export async function createInvite({ guests, ceremony }: CreateInviteParams) {
  try {
    const client = await mongoDBService.client();
    const dbString = process.env.MONGODB_DB;
    if (!dbString) {
      throw new Error('MONGODB_DB is not set');
    }

    const inviteId = Math.random().toString(36).substring(5);

    const db = client.db(dbString);
    const collection = db.collection<Omit<Invite, '_id'>>('invites');
    const updatedDoc = await collection.insertOne({
      inviteId,
      guests,
      ceremony,
    });
    if (!updatedDoc.acknowledged) {
      throw new Error('Failed to create invite');
    }

    return {
      inviteId,
      guests,
      ceremony,
    };
  } catch (err: unknown) {
    captureException(err);
    console.error(err);
    throw err;
  }
}
