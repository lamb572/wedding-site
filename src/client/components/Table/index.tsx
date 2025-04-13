'use client';

import EditableCell from '@/client/components/Table/EditableCell';
import TableCell from '@/client/components/Table/TableCell';
import TableHeader from '@/client/components/Table/TableHeader';
import TableHeaderRow from '@/client/components/Table/TableHeaderRow';
import TableRow from '@/client/components/Table/TableRow';
import { Invite, updateInvite } from '@/server/Invite';
import { Box, Button, MenuItem, Typography } from '@mui/material';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import { Fragment } from 'react';

const foodOptions = [
  { label: 'Pork', value: 'pork' },
  { label: 'Miso', value: 'vegan' },
  { label: 'Not Picked', value: 'undefined' },
];

interface InviteTableProps {
  invites: Omit<Invite, '_id'>[];
}

export default function InviteTable({ invites }: InviteTableProps) {
  const columnHelper = createColumnHelper<Invite>();

  const inviteColumns = [
    columnHelper.accessor('inviteId', {
      header: () => <Typography component="span">Invite ID</Typography>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('guests', {
      header: () => <Typography component="span">Guests</Typography>,
      footer: (info) => info.column.id,
      cell: ({ getValue, row }) => {
        const guests = getValue() ?? [];
        const guestNames =
          guests?.length > 2
            ? `${guests.at(0)?.name}, ${guests.at(1)?.name}, ...`
            : guests.map((guest) => guest.name).join(', ');
        return row.getCanExpand() ? (
          <Button
            onClick={row.getToggleExpandedHandler()}
            variant="text"
            sx={{
              textTransform: 'none',
            }}
          >
            {row.getIsExpanded() ? '👇' : '👉'} {guestNames}
          </Button>
        ) : (
          '🔵'
        );
      },
    }),
    columnHelper.accessor('ceremony', {
      header: () => <Typography component="span">Ceremony</Typography>,
      cell: ({ getValue, row }) => {
        const value = getValue() ? 'y' : 'n';
        const options = [
          { label: 'Yes', value: 'y' },
          { label: 'No', value: 'n' },
        ];

        return (
          <EditableCell
            value={value}
            onBlur={(value) => {
              updateInvite({
                inviteId: row.original.inviteId,
                update: {
                  $set: { ceremony: value === 'y' },
                },
              });
            }}
            select
            sx={{
              width: '80px',
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </EditableCell>
        );
      },
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor('attending', {
      header: () => <Typography component="span">Attending</Typography>,
      cell: (info) => {
        const value = info.getValue() ? 'y' : 'n';
        const options = [
          { label: 'Yes', value: 'y' },
          { label: 'No', value: 'n' },
        ];

        return (
          <EditableCell
            value={value}
            onBlur={(value) => {
              updateInvite({
                inviteId: info.row.original.inviteId,
                update: {
                  $set: { attending: value === 'y' },
                },
              });
            }}
            select
            sx={{
              width: '80px',
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </EditableCell>
        );
      },
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor('inviteSentStatus', {
      header: () => <Typography component="span">Invite Status</Typography>,
      cell: (info) => info.getValue()?.join(', '),
      footer: (info) => info.column.id,
    }),
  ] as ColumnDef<Omit<Invite, '_id'>>[];

  const table = useReactTable<Omit<Invite, '_id'>>({
    data: invites,
    columns: inviteColumns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => {
      const guests = row.original.guests ?? [];
      return guests.length > 0;
    },
  });

  const getRowBackgroundColor = (row: Row<Omit<Invite, '_id'>>) => {
    const isExpanded = row.getIsExpanded();
    const attending =
      row.getValue('attending') === null
        ? 'notReplied'
        : row.getValue('attending');
    const isNotAttending = attending === false;
    const notReplied = attending === 'notReplied';
    const hasFoodAllergy = row.original.guests?.some((guest) =>
      Boolean(guest.foodAllergies),
    );
    if (isExpanded) {
      return 'secondary.light';
    }
    if (isNotAttending) {
      return 'error.light';
    }
    if (notReplied) {
      return 'warning.light';
    }
    if (hasFoodAllergy) {
      return 'pink';
    }
  };

  return (
    <>
      <Box
        component="table"
        sx={{
          borderCollapse: 'collapse',
          width: '100%',
        }}
      >
        <Box component="thead">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeader key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHeader>
              ))}
            </TableHeaderRow>
          ))}
        </Box>
        <Box component="tbody">
          {table.getRowModel().rows.map((row) => {
            return (
              <Fragment key={row.id}>
                <TableRow
                  sx={{
                    backgroundColor: getRowBackgroundColor(row),
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow>
                    <TableCell colSpan={row.getAllCells().length}>
                      <Box
                        component="table"
                        sx={{
                          borderCollapse: 'collapse',
                          width: '-webkit-fill-available',
                          margin: { xs: '0 8px', md: '0 32px' },
                        }}
                      >
                        <thead>
                          <TableHeaderRow
                            sx={{ backgroundColor: 'secondary.light' }}
                          >
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Food</TableHeader>
                            <TableHeader>Food Allergies</TableHeader>
                            <TableHeader>Phone Number</TableHeader>
                          </TableHeaderRow>
                        </thead>
                        <tbody>
                          {row.original.guests?.map((guest, index) => {
                            const inviteId = row.original.inviteId;

                            return (
                              <TableRow key={index}>
                                <TableCell>
                                  <EditableCell
                                    value={guest?.name ?? ''}
                                    onBlur={(value) => {
                                      updateInvite({
                                        inviteId: inviteId,
                                        update: {
                                          $set: {
                                            [`guests.${index}.name`]: value,
                                          },
                                        },
                                      });
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <EditableCell
                                    value={guest?.food ?? 'undefined'}
                                    onChange={(value) => {
                                      const newValue =
                                        value === 'undefined'
                                          ? undefined
                                          : value;
                                      updateInvite({
                                        inviteId: inviteId,
                                        update: {
                                          $set: {
                                            [`guests.${index}.food`]: newValue,
                                          },
                                        },
                                      });
                                    }}
                                    select
                                  >
                                    {foodOptions.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value ?? 'undefined'}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </EditableCell>
                                </TableCell>
                                <TableCell>
                                  <EditableCell
                                    value={guest?.foodAllergies ?? ''}
                                    onBlur={(value) => {
                                      updateInvite({
                                        inviteId: inviteId,
                                        update: {
                                          $set: {
                                            [`guests.${index}.foodAllergies`]:
                                              value,
                                          },
                                        },
                                      });
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <EditableCell
                                    value={guest?.phoneNumber ?? ''}
                                    onBlur={(value) => {
                                      updateInvite({
                                        inviteId: inviteId,
                                        update: {
                                          $set: {
                                            [`guests.${index}.phoneNumber`]:
                                              value,
                                          },
                                        },
                                      });
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </tbody>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
