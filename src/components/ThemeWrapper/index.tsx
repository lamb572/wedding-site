"use client"

import { Theme } from "@/sanity"
import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material"
import { PropsWithChildren } from "react"

export interface ThemeWrapperProps extends PropsWithChildren {
  sanityTheme?: Theme
}

export default function ThemeWrapper({
  children,
  sanityTheme,
}: ThemeWrapperProps) {
  const palette = sanityTheme?.palette
  const theme = createTheme({
    cssVariables: true,
    typography: {
      fontFamily: "var(--font-roboto)",
    },
    ...(palette && { palette }),
  })
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
