import { z } from "zod"

const guestSchema = z.object({
  name: z.string().optional(),
  food: z.union([z.literal("pork"), z.literal("vegan")]).optional(),
  phoneNumber: z.string().optional(),
  foodAllergies: z.string().optional(),
})

export interface Companion extends z.infer<typeof guestSchema> {}

export const inviteSchema = z.object({
  _id: z.string(),
  attending: z.boolean().optional(),
  inviteId: z.string(),
  guests: z.array(guestSchema).optional(),
  ceremony: z.boolean().optional(),
})

export interface Invite extends z.infer<typeof inviteSchema> {}
