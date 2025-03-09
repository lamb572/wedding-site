"use client"
import { TextField } from "@/client/components/TextField"
import { rsvpFormAction } from "@/server/formActions/rsvpFormAction"
import { RSVPForm, rsvpFormSchema, updateInvite } from "@/server/Invite"
import { rsvpFormOptions } from "@/shared"
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material"
import { mergeForm, useForm, useTransform } from "@tanstack/react-form"
import { initialFormState } from "@tanstack/react-form/nextjs"
import { useRouter } from "next/navigation"
import { useActionState } from "react"

export interface RSVPIdViewProps {
  invite: RSVPForm
}

export default function RSVPView({ invite }: RSVPIdViewProps) {
  const [state, action] = useActionState(rsvpFormAction, initialFormState)
  const router = useRouter()
  const form = useForm({
    ...rsvpFormOptions,
    defaultValues: {
      inviteId: invite.inviteId ?? "",
      attending: invite.attending ?? false,
      guests: invite.guests ?? [],
    },
    validators: {
      onChange: rsvpFormSchema,
    },
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
    onSubmit: async (formData) => {
      await updateInvite({
        ...formData.value,
        inviteId: invite.inviteId,
      })
      router.push("/thank-you")
    },
  })
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        my: 4,
        minWidth: { xs: 300, md: 400 },
      }}
    >
      <Typography variant="h2" component="h1" color="primary">
        RSVP
      </Typography>
      <Box
        component={"form"}
        action={action}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form.Field name="attending">
          {(field) => {
            return (
              <FormControl>
                <RadioGroup
                  aria-labelledby="attending"
                  value={field.state.value ? "true" : "false"}
                  name="attending-group"
                  onChange={(_e, value) =>
                    field.handleChange(Boolean(value === "true"))
                  }
                >
                  <FormControlLabel
                    value={"true"}
                    control={<Radio />}
                    label="Attending"
                  />
                  <FormControlLabel
                    value={"false"}
                    control={<Radio />}
                    label="Not Attending"
                  />
                </RadioGroup>
              </FormControl>
            )
          }}
        </form.Field>
        <form.Field name="guests" mode="array">
          {(field) => {
            return field.state.value?.map((_, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid black",
                    padding: 2,
                    gap: 2,
                    backgroundColor: "white",
                    borderRadius: 4,
                  }}
                >
                  <form.Field key={i} name={`guests[${i}].name`}>
                    {(subField) => {
                      return (
                        <TextField
                          value={subField.state.value}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
                          }
                          label="Guest Name"
                          variant="outlined"
                          name={`companions-${i}`}
                          type="text"
                        />
                      )
                    }}
                  </form.Field>
                  <form.Field name={`guests[${i}].food`}>
                    {(field) => {
                      return (
                        <FormControl
                          sx={{
                            maxWidth: 220,
                            gap: 1,
                          }}
                        >
                          <FormLabel>Menu Selection</FormLabel>
                          <RadioGroup
                            aria-labelledby="Food"
                            value={field.state.value ?? ""}
                            name="food-group"
                            onChange={(_e, value) =>
                              field.handleChange(value as "pork" | "vegan")
                            }
                          >
                            <FormControlLabel
                              value={"pork"}
                              control={<Radio />}
                              label="Free range Pulled Pork"
                            />
                            <FormControlLabel
                              value={"vegan"}
                              control={<Radio />}
                              label="Miso & maple roasted aubergine with ginger and coriander (Ve)"
                            />
                          </RadioGroup>
                        </FormControl>
                      )
                    }}
                  </form.Field>
                  <form.Field name={`guests[${i}].foodAllergies`}>
                    {(field) => {
                      const errors = field.state.meta.errors
                      const isErrors = errors.length > 0
                      return (
                        <TextField
                          error={isErrors}
                          helperText={errors.join(", ")}
                          label="Dietary Requirement?"
                          variant="outlined"
                          name="foodAllergies"
                          type="text"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )
                    }}
                  </form.Field>
                </Box>
              )
            })
          }}
        </form.Field>

        <form.Subscribe
          selector={({ canSubmit, isSubmitting, isFieldsValidating }) => [
            canSubmit,
            isSubmitting,
            isFieldsValidating,
          ]}
        >
          {([canSubmit, isSubmitting, isFieldsValidating]) => (
            <Button
              type="submit"
              variant="outlined"
              disabled={!canSubmit}
              loading={isSubmitting || isFieldsValidating}
              onClick={form.handleSubmit}
            >
              Submit
            </Button>
          )}
        </form.Subscribe>
      </Box>
    </Box>
  )
}
