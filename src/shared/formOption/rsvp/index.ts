import { RSVPForm } from "@/server/Invite"
import { formOptions } from "@tanstack/react-form/nextjs"

export const rsvpFormOptions = formOptions<RSVPForm>({
  defaultValues: {
    inviteId: "",
    attending: false,
    guests: [],
  },
})
