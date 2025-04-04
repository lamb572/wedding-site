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
  useReactTable,
} from '@tanstack/react-table';
import { Fragment, useEffect, useState } from 'react';

interface AdminViewProps {
  invites: Omit<Invite, '_id'>[];
}
export default function AdminView({ invites }: AdminViewProps) {
  const columnHelper = createColumnHelper<Invite>();

  const inviteColumns = [
    // {
    //   id: 'expander',
    //   header: () => null,
    //   cell: ({ row }) => {
    //     return row.getCanExpand() ? (
    //       <button
    //         {...{
    //           onClick: row.getToggleExpandedHandler(),
    //           style: { cursor: 'pointer' },
    //         }}
    //       >
    //         {row.getIsExpanded() ? '👇' : '👉'}
    //       </button>
    //     ) : (
    //       '🔵'
    //     );
    //   },
    // },
    columnHelper.accessor('inviteId', {
      header: () => <Typography component="span">Invite ID</Typography>,
      cell: (info) => info.getValue(),
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
            onChange={(value) => {
              updateInvite({
                inviteId: info.row.original.inviteId,
                update: {
                  $set: { attending: value === 'y' },
                },
              });
              console.log('onChange', value);
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
    // getSubRows: (row) => row.guests,
    getRowCanExpand: (row) => {
      const guests = row.original.guests ?? [];
      return guests.length > 0;
      // return true;
    },
  });

  return (
    <>
      <Box
        component="table"
        sx={{
          borderCollapse: 'collapse',
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
            // const inviteId = row.original.inviteId;
            return (
              <Fragment key={row.id}>
                <TableRow>
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
                          width: '100%',
                        }}
                      >
                        <thead>
                          <TableHeaderRow>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Food</TableHeader>
                            <TableHeader>Food Allergies</TableHeader>
                            <TableHeader>Phone Number</TableHeader>
                          </TableHeaderRow>
                        </thead>
                        <tbody>
                          {row.original.guests?.map((guest, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <EditableCell
                                  value={guest?.name}
                                  onChange={(value) => {
                                    console.log('onChange', value);
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <EditableCell
                                  value={guest?.food}
                                  onChange={(value) => {
                                    console.log('onChange', value);
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <EditableCell
                                  value={guest?.foodAllergies}
                                  onChange={(value) => {
                                    console.log('onChange', value);
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <EditableCell
                                  value={guest?.phoneNumber}
                                  onChange={(value) => {
                                    console.log('onChange', value);
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
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
