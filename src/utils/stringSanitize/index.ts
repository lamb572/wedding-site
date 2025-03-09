import { z } from "zod"
import validator from "validator"

export function stringSanitize(string: string) {
  const schema = z.string().transform((data) => {
    const sanitized = validator.blacklist(data, "[$\.]")

    return sanitized
  })
  const result = schema.safeParse(string)
  if (result.success) {
    return result.data
  } else {
    console.error(result.error.errors)
  }
  return undefined
}
