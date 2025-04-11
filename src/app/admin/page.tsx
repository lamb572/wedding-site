import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import AdminView from '@/client/views/AdminView';
import { getSettings } from '@/sanity/server';
import { getInvites } from '@/server/Invite/getInvites';
import { getMetricsInvite } from '@/server/Invite/getMetricsInvite';
import { Stack } from '@mui/material';
import Card from '@mui/material/Card';

export default async function Admin() {
  const session = await auth();

  const settings = await getSettings();

  // console.log("session", session)
  if (!session?.user) {
    redirect('/admin/signin');
  }

  const invites = await getInvites();

  const metrics = (await getMetricsInvite()) ?? [];

  return (
    <Stack
      sx={{
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Card
        raised
        sx={{
          backgroundColor: settings?.card?.backgroundColor,
          minHeight: '50%',
          margin: 1,
          padding: 1,
          width: '100%',
        }}
      >
        <Stack
          sx={{
            textAlign: 'center',
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <AdminView invites={invites ?? []} metrics={metrics} />
        </Stack>
      </Card>
    </Stack>
  );
}
