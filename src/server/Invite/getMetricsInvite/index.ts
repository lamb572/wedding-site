'use server';
import mongoDBService from '@/server/mongodb';
import { captureException } from '@sentry/nextjs';
import { Invite } from '../types';

export interface MetricsAggregate {
  guests: number;
  attending: number;
  notAttending: number;
  notReplied: number;
  pork: number;
  vegan: number;
}

export interface MetricsInvite {
  label: string;
  value: number;
}

export async function getMetricsInvite(): Promise<MetricsInvite[] | undefined> {
  try {
    const client = await mongoDBService.client();
    const dbString = process.env.MONGODB_DB;
    if (!dbString) {
      throw new Error('MONGODB_DB is not set');
    }
    const db = await client.db(dbString);
    const collection = db.collection<Invite>('invites');

    const metrics = await collection.aggregate([
      {
        $addFields: {
          attending: {
            $ifNull: ['$attending', 'notAttending'],
          },
          pork: {
            $reduce: {
              input: '$guests',
              initialValue: 0,
              in: {
                $cond: [
                  {
                    $eq: ['$$this.food', 'pork'],
                  },
                  {
                    $add: ['$$value', 1],
                  },
                  '$$value',
                ],
              },
            },
          },
          vegan: {
            $reduce: {
              input: '$guests',
              initialValue: 0,
              in: {
                $cond: [
                  {
                    $eq: ['$$this.food', 'vegan'],
                  },
                  {
                    $add: ['$$value', 1],
                  },
                  '$$value',
                ],
              },
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          Guests: {
            $sum: {
              $size: '$guests',
            },
          },
          Attending: {
            $sum: {
              $multiply: [
                {
                  $size: '$guests',
                },
                {
                  $cond: [
                    {
                      $eq: ['$attending', true],
                    },
                    1,
                    0,
                  ],
                },
              ],
            },
          },
          'Not Attending': {
            $sum: {
              $multiply: [
                {
                  $size: '$guests',
                },
                {
                  $cond: [
                    {
                      $eq: ['$attending', false],
                    },
                    1,
                    0,
                  ],
                },
              ],
            },
          },
          'Not Replied': {
            $sum: {
              $multiply: [
                {
                  $size: '$guests',
                },
                {
                  $cond: [
                    {
                      $eq: ['$attending', 'notAttending'],
                    },
                    1,
                    0,
                  ],
                },
              ],
            },
          },
          Pork: {
            $sum: '$pork',
          },
          Vegan: {
            $sum: '$vegan',
          },
        },
      },
    ]);
    const result = (await metrics.toArray()) as MetricsInvite[];

    return Object.entries(result[0]).reduce<MetricsInvite[]>(
      (acc, [label, value]) => {
        if (label === '_id') {
          return acc;
        }
        return [...acc, { label, value }];
      },
      [],
    );
  } catch (err: unknown) {
    captureException(err);
    console.error(err);
  }
}
