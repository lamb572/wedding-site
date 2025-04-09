'use client';

import InviteTable from '@/client/components/Table';
import { Invite } from '@/server/Invite';
import { Stack, Typography } from '@mui/material';

interface AdminViewProps {
  invites: Omit<Invite, '_id'>[];
}
export default function AdminView({ invites }: AdminViewProps) {
  return (
    <Stack width={'100%'} padding={2} gap={2}>
      <Typography variant="h3" component={'h1'} color="primary">
        <strong>Invite List</strong>
      </Typography>
      {/* todo add numbers, attending,not attending, not replied, food choices,  
      Add colors to rows:
      - Red for Not Attending
      - Yellow for Not Replied
      - Pink for Food allergy in guest list
      */}
      <InviteTable invites={invites} />
    </Stack>
  );
}
