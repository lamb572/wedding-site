import { Guest } from "@/server/Guest"
import { formOptions } from "@tanstack/react-form/nextjs"

export interface RSVPForm extends Omit<Guest, "_id"> {}

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
