"use client"

import { verifyUserExists } from "@/server/formActions"
import { inviteForm, inviteFormSchema } from "@/shared"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"

export default function InviteView() {
  const handleSubmit = () => {
    console.log("submit")
  }
  const form = useForm({
    ...inviteForm,
    asyncDebounceMs: 500,
    validators: {
      onChangeAsync: inviteFormSchema.refine(
        async (value) => {
          try {
            await verifyUserExists(value.inviteId)
            return value
          } catch (err) {
            console.log("test -err", err)
            return {
              message: "User does not exist",
            }
          }
        },
        {
          message: "You can only increase the age",
        }
      ),
    },
    onSubmit: handleSubmit,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field
        name="inviteId"
        asyncDebounceMs={500}
        validators={{
          onChangeAsync: z.string().refine(
            async (inviteId) => {
              try {
                return await verifyUserExists(inviteId)
              } catch (err) {
                if (err instanceof Error) {
                  return {
                    message: err.message,
                  }
                }
                return {
                  message: "Error validating ID",
                }
              }
            },
            {
              message: "Error validating User ID",
            }
          ),
        }}
      >
        {(field) => {
          return (
            <div>
              <input
                name="inviteId"
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error as string}>{error}</p>
              ))}
            </div>
          )
        }}
      </form.Field>
      <form.Subscribe
        selector={({
          canSubmit,
          isSubmitting,
          isDirty,
          isFieldsValidating,
          isPristine,
        }) => [
          canSubmit,
          isSubmitting,
          isDirty,
          isFieldsValidating,
          isPristine,
        ]}
      >
        {([
          canSubmit,
          isSubmitting,
          isDirty,
          isFieldsValidating,
          isPristine,
        ]) => (
          <button type="submit" disabled={!canSubmit || !isDirty || isPristine}>
            {isSubmitting || isFieldsValidating ? "..." : "Submit"}
          </button>
        )}
      </form.Subscribe>
    </form>
  )
}
