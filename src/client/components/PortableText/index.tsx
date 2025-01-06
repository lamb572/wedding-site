import {
  portableTextStringInterpolation,
  TextBlock,
} from "@/utils/stringInterpolation"
import { Typography } from "@mui/material"
import {
  PortableTextReactComponents,
  PortableText as SanityPortableText,
} from "@portabletext/react"

export interface PortableTextProps {
  value: TextBlock
  stringInterpolationData?: Record<string, string>
}

export default function PortableText({
  value,
  stringInterpolationData,
}: PortableTextProps) {
  const components: Partial<PortableTextReactComponents> = {
    block: {
      h1: ({ children }) => <Typography variant="h1">{children}</Typography>,

      normal: ({ children }) => (
        <Typography
          variant="body1"
          sx={{
            minHeight: "1rem",
          }}
        >
          {children}
        </Typography>
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
