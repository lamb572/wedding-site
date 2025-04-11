import { SxProps } from '@mui/material';
import { PropsWithChildren } from 'react';
import TableRow from '../TableRow';

interface TableHeaderRowProps extends PropsWithChildren {
  sx?: SxProps;
}

export default function TableHeaderRow({ children, sx }: TableHeaderRowProps) {
  return (
    <TableRow
      sx={{
        border: '1px solid black',
        backgroundColor: 'primary.light',
        ...sx,
      }}
    >
      {children}
    </TableRow>
  );
}
