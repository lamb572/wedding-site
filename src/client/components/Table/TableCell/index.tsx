import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

interface TableCellProps extends PropsWithChildren {
  colSpan?: number;
}

export default function TableCell({ children, colSpan }: TableCellProps) {
  return (
    <Box
      colSpan={colSpan}
      component="td"
      sx={{
        borderLeft: '1px solid grey',
        borderRight: '1px solid grey',
        padding: '0.5rem',
      }}
    >
      {children}
    </Box>
  );
}
