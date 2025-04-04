import { PropsWithChildren } from 'react';
import TableRow from '../TableRow';

export default function TableHeaderRow({ children }: PropsWithChildren) {
  return (
    <TableRow
      sx={{
        border: '1px solid black',
        backgroundColor: 'primary.light',
      }}
    >
      {children}
    </TableRow>
  );
}
