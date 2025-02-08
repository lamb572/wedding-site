import { inviteSchema } from "@/server/Invite"
import { rsvpFormOptions } from "@/shared"
import {
  createServerValidate,
  ServerValidateError,
} from "@tanstack/react-form/nextjs"

const serverValidate = createServerValidate({
  ...rsvpFormOptions,
  onServerValidate: ({ value }) => {
    const results = inviteSchema
      .omit({ _id: true, inviteId: true })
      .safeParse(value)

    if (!results.success) {
      return results.error.flatten().formErrors.join("\n")
    }
  },
})

export async function rsvpFormAction(prev: unknown, formData: FormData) {
  try {
    await serverValidate(formData)

    return formData
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState
    }

    // Some other error occurred while validating your form
    throw e
  }
}
