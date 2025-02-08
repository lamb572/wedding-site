import { z } from "zod"

export const companionSchema = z.object({
  name: z.string().optional(),
})

export interface Companion extends z.infer<typeof companionSchema> {}

export const guestSchema = z.object({
  _id: z.string(),
  name: z.string().min(2),
  attending: z.boolean().optional(),
  inviteId: z.string(),
  companions: z.array(companionSchema).optional(),
  foodAllergies: z.string().optional(),
  phoneNumber: z.string(),
  ceremony: z.boolean().optional(),
})

export interface Guest extends z.infer<typeof guestSchema> {}
