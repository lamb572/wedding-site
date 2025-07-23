'use client';
import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <Button
      variant="contained"
      onClick={async () => {
        await signIn('discord', {
          redirectTo: '/admin',
        });
      }}
    >
      Signin with Discord
    </Button>
  );
}
