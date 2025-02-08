import { Invite } from "@/server/Invite"
import { formOptions } from "@tanstack/react-form/nextjs"

export interface RSVPForm extends Omit<Invite, "_id"> {}

export const rsvpFormOptions = formOptions<RSVPForm>({
  defaultValues: {
    inviteId: "",
    name: "",
    attending: false,
    foodAllergies: "",
    companions: [],
    phoneNumber: "",
  },
})
