import { formOptions } from "@tanstack/react-form-nextjs"

export const rsvpFormOptions = formOptions({
  defaultValues: {
    inviteId: "",
    attending: false,
    guests: [] as { name?: string; food?: "pork" | "vegan"; foodAllergies?: string }[],
  },
})
