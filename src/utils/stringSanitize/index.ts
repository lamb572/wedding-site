import { captureException } from "@sentry/nextjs"
import validator from "validator"
import { z } from "zod"

export function stringSanitize(string: string) {
  const schema = z.string().transform((data) => {
    const sanitized = validator.blacklist(data, "[$\.]")

    return sanitized
  })
  const result = schema.safeParse(string)
  if (result.success) {
    return result.data
  } else {
    captureException(result.error)
    console.error(result.error.errors)
  }
  return undefined
}
