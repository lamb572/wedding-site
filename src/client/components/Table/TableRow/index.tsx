import { Box, BoxProps } from '@mui/material';
import { PropsWithChildren } from 'react';

export interface TableRowProps extends PropsWithChildren, BoxProps {}

export default function TableRow({ children, ...props }: TableRowProps) {
  return (
    <Box
      component="tr"
      sx={{
        border: '1px solid black',
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
