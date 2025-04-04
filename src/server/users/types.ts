import { z } from "zod"

export const userSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
})

export interface User extends z.infer<typeof userSchema> {}
