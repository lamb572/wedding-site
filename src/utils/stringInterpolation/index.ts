import { PortableTextBlock } from "@portabletext/react"

export function stringInterpolation(
  str?: string,
  data?: Record<string, string>
) {
  if (!str || !data) return str
  return str.replace(/\${{(.*?)}}/g, (match, key) => {
    return data[key]
  })
}

export type TextBlock = PortableTextBlock | PortableTextBlock[]
export function portableTextStringInterpolation(
  block?: TextBlock,
  data?: Record<string, string>
) {
  if (!block || !data) return block
  if (Array.isArray(block)) {
    return block.map((b) => {
      return {
        ...b,
        children: b.children?.map((c) => {
          return {
            ...c,
            text: stringInterpolation(c.text, data),
          }
        }),
      }
    })
  }
  return {
    ...block,
    children: block.children?.map((c) => {
      return {
        ...c,
        text: stringInterpolation(c.text, data),
      }
    }),
  }
}
