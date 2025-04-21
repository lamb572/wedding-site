'use server';
import mongoDBService from '@/server/mongodb';
import { captureException } from '@sentry/nextjs';
import { Invite } from '../types';

interface Metric {
  value: number;
  percentage?: number;
}

export interface MetricsAggregate {
  guests: Metric;
  attending: Metric;
  notAttending: Metric;
  notReplied: Metric;
  pork: Metric;
  vegan: Metric;
}

export interface MetricsInvite {
  label: string;
  value: number;
  percentage?: number;
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
      {
        $project:
          /**
           * specifications: The fields to
           *   include or exclude.
           */
          {
            Guests: {
              value: '$Guests',
            },
            Attending: {
              value: '$Attending',
              percentage: {
                $floor: {
                  $multiply: [
                    {
                      $divide: ['$Attending', '$Guests'],
                    },
                    100,
                  ],
                },
              },
            },
            'Not Attending': {
              value: '$Not Attending',
              percentage: {
                $floor: {
                  $multiply: [
                    {
                      $divide: ['$Not Attending', '$Guests'],
                    },
                    100,
                  ],
                },
              },
            },
            'Not Replied': {
              value: '$Not Replied',
              percentage: {
                $floor: {
                  $multiply: [
                    {
                      $divide: ['$Not Replied', '$Guests'],
                    },
                    100,
                  ],
                },
              },
            },
            Pork: {
              value: '$Pork',
              percentage: {
                $floor: {
                  $multiply: [
                    {
                      $divide: ['$Pork', '$Guests'],
                    },
                    100,
                  ],
                },
              },
            },
            Vegan: {
              value: '$Vegan',
              percentage: {
                $floor: {
                  $multiply: [
                    {
                      $divide: ['$Vegan', '$Guests'],
                    },
                    100,
                  ],
                },
              },
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
        return [
          ...acc,
          { label, value: value.value, percentage: value.percentage },
        ];
      },
      [],
    );
  } catch (err: unknown) {
    captureException(err);
    console.error(err);
  }
}
