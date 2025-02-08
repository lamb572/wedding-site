import { guestSchema, inviteSchema } from "@/server/Invite"
import { formOptions } from "@tanstack/react-form/nextjs"
import { z } from "zod"

export const rsvpFormSchema = z
  .object({
    guests: z.array(guestSchema.omit({ phoneNumber: true })),
  })
  .merge(inviteSchema.omit({ _id: true }))
export interface RSVPForm extends z.infer<typeof rsvpFormSchema> {}

export const rsvpFormOptions = formOptions<RSVPForm>({
  defaultValues: {
    inviteId: "",
    attending: false,
    guests: [],
  },
})
