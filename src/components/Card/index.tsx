import { Card as MUICard, Stack, StackProps } from '@mui/material';
import { PropsWithChildren } from 'react';

export interface CardProps extends PropsWithChildren, StackProps {
  backgroundColor: string;
}

export default function Card({
  children,
  backgroundColor,
  ...stackProps
}: CardProps) {
  return (
    <Stack
      sx={{
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <MUICard
        raised
        sx={{
          backgroundColor: backgroundColor,
          minHeight: '50%',
          margin: 1,
          padding: 1,
          width: {
            xs: '100%',
            sm: '80%',
            md: '60%',
            lg: '50%',
          },
          maxWidth: { xs: 300, md: 400, lg: 600 },
        }}
      >
        <Stack
          // {...stackProps}
          sx={{
            padding: 2,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid grey',
            // gap: 4,
            gap: 2,
            minHeight: '100%',
            whiteSpace: 'normal',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            ...stackProps.sx,
          }}
        >
          {children}
        </Stack>
      </MUICard>
    </Stack>
  );
}
