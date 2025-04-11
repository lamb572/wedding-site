'use server';
import mongoDBService from '@/server/mongodb';
import { captureException } from '@sentry/nextjs';
import { Filter } from 'mongodb';
import { User } from '../types';

export async function getUser(filter: Filter<User>): Promise<User | undefined> {
  try {
    const client = await mongoDBService.client();
    const dbString = process.env.MONGODB_DB;
    if (!dbString) {
      throw new Error('MONGODB_DB is not set');
    }
    const db = await client.db(dbString);
    const collection = db.collection<User>('users');

    const user = await collection.findOne(filter);

    return user ?? undefined;
  } catch (err: unknown) {
    captureException(err);
    console.error(err);
  }
}
