"use client"
import { TextField } from "@/client/components/TextField"
import { verifyInviteExists } from "@/server/formActions"
import { Box, Button } from "@mui/material"
import { FormOptions, useForm } from "@tanstack/react-form"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { z } from "zod"

export const inviteFormSchema = z.object({
  inviteId: z.string().min(4).max(10),
})

export interface InviteForm extends z.infer<typeof inviteFormSchema> {}

export default function InviteView() {
  const [savedInviteId, setSavedInviteId] = useState("")
  const router = useRouter()

  const handleSubmit: FormOptions<InviteForm>["onSubmit"] = ({ value }) => {
    window.localStorage.setItem("inviteId", value.inviteId)
    router.push(`/invite/${value.inviteId}`)
  }
  const form = useForm({
    defaultValues: {
      inviteId: savedInviteId,
    },
    validators: {
      onChange: inviteFormSchema,
    },
    asyncDebounceMs: 500,
    onSubmit: handleSubmit,
  })

  useEffect(() => {
    const storedInviteId = window.localStorage.getItem("inviteId")
    if (storedInviteId) {
      setSavedInviteId(storedInviteId)
    }
  }, [])

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
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
                const result = await verifyInviteExists(inviteId)
                return result ?? "User not found"
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
          const errors = field.state.meta.errors
          const isErrors = errors.length > 0
          return (
            <div>
              <TextField
                error={isErrors}
                helperText={
                  isErrors
                    ? errors.join(", ")
                    : "ID can be found in invite message"
                }
                label="Invite ID"
                variant="outlined"
                name="inviteId"
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
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
          <Button
            type="submit"
            variant="outlined"
            disabled={!canSubmit || !isDirty || isPristine}
            loading={isSubmitting || isFieldsValidating}
          >
            Submit Invite ID
          </Button>
        )}
      </form.Subscribe>
    </Box>
  )
}
