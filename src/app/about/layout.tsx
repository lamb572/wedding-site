import Stack from "@mui/material/Stack"
import { PropsWithChildren } from "react"

export interface AboutLayoutProps extends PropsWithChildren {}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <Stack spacing={2} direction="column">
      about page layout
      {children}
    </Stack>
  )
}
