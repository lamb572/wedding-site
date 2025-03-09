"use client"

import { Stack, Card as MUICard } from "@mui/material"
import { PropsWithChildren } from "react"

export interface CardProps extends PropsWithChildren {
  backgroundColor: string
}

export default function Card({ children, backgroundColor }: CardProps) {
  return (
    <Stack
      sx={{
        textAlign: "center",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      <MUICard
        raised
        sx={{
          backgroundColor: backgroundColor,
          minHeight: "50%",
          margin: 1,
          padding: 1,
        }}
      >
        <Stack
          sx={{
            padding: 2,
            textAlign: "center",
            justifyContent: "center",
            border: "1px solid grey",
            gap: 2,
            minHeight: "100%",
            whiteSpace: "normal",
          }}
        >
          {children}
        </Stack>
      </MUICard>
    </Stack>
  )
}
