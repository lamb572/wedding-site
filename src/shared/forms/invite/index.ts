import { formOptions } from "@tanstack/react-form/nextjs"
import { z } from "zod"

export const inviteFormSchema = z.object({
  inviteId: z.string().min(4).max(10),
})

export const inviteForm = formOptions({
  defaultValues: {
    inviteId: "",
  },
  validators: {
    onChange: inviteFormSchema,
  },
})
