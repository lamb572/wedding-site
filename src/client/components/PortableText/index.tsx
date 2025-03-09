"use client"
import {
  portableTextStringInterpolation,
  TextBlock,
} from "@/utils/stringInterpolation"
import { Box, Link, Theme, Typography, TypographyProps } from "@mui/material"
import {
  PortableTextReactComponents,
  PortableText as SanityPortableText,
} from "@portabletext/react"

export interface PortableTextProps {
  value: TextBlock
  stringInterpolationData?: Record<string, string>
}

export type TypographyColor = TypographyProps["color"]

const getPaletteColor = (theme: Theme, color: TypographyColor) => {
  if (color === "textSecondary") return theme.palette.text.secondary
  if (color === "primary") return theme.palette.primary.main
  if (color === "secondary") return theme.palette.secondary.main
  if (color === "success") return theme.palette.success.main
  if (color === "error") return theme.palette.error.main
  if (color === "info") return theme.palette.info.main
  if (color === "warning") return theme.palette.warning.main
  if (color === "textPrimary") return theme.palette.text.primary
  if (color === "textDisabled") return theme.palette.text.disabled
}

export default function PortableText({
  value,
  stringInterpolationData,
}: PortableTextProps) {
  const components: Partial<PortableTextReactComponents> = {
    marks: {
      color: ({ children, value }) => {
        const color = value.color as TypographyColor

        return (
          <Box
            component="span"
            sx={(theme) => {
              const paletteColor = getPaletteColor(theme, color)
              return { color: paletteColor }
            }}
          >
            {children}
          </Box>
        )
      },
      link: ({ children, value }) => {
        return (
          <Link target="_blank" href={value.href}>
            {children}
          </Link>
        )
      },
    },
    block: {
      h1: ({ children }) => <Typography variant="h1">{children}</Typography>,

      normal: ({ children }) => (
        <Typography variant="body1">{children}</Typography>
      ),
      blockquote: ({ children }) => (
        <Typography
          variant="body1"
          sx={{
            margin: "1em 0",
            padding: "1em 1.5em",
            borderLeft: "5px solid #ccc",
            fontStyle: "italic",
          }}
        >
          {children}
        </Typography>
      ),
      h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
      h3: ({ children }) => <Typography variant="h3">{children}</Typography>,
      h4: ({ children }) => <Typography variant="h4">{children}</Typography>,
      h5: ({ children }) => <Typography variant="h5">{children}</Typography>,
      h6: ({ children }) => <Typography variant="h6">{children}</Typography>,
    },
  }
  if (stringInterpolationData) {
    return (
      <SanityPortableText
        value={
          portableTextStringInterpolation(value, stringInterpolationData) ?? []
        }
        components={components}
      />
    )
  }
  return <SanityPortableText value={value} components={components} />
}
