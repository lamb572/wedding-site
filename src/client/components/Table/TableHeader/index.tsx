import { Box, BoxProps, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export interface TableHeaderProps extends PropsWithChildren, BoxProps {}

export default function TableHeader({
  children,
  sx,
  ...props
}: TableHeaderProps) {
  return (
    <Box
      component="th"
      {...props}
      sx={{
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: 'primary.main',
        borderLeftStyle: 'solid',
        borderLeftWidth: '1px',
        borderLeftColor: 'primary.main',
        padding: '0.5rem',
        ...sx,
      }}
    >
      <Typography>{children}</Typography>
    </Box>
  );
}
