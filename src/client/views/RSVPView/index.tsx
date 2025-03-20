"use client"
import { Container } from "@/client/components/Container"
import { TextField } from "@/client/components/TextField"
import { rsvpFormAction } from "@/server/formActions/rsvpFormAction"
import { RSVPForm, rsvpFormSchema, updateRSVPForm } from "@/server/Invite"
import { rsvpFormOptions } from "@/shared"
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Tooltip,
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
      await updateRSVPForm({
        ...formData.value,
        inviteId: invite.inviteId,
      })
      router.push("/thank-you")
    },
  })
  return (
    <>
      <Typography variant="h2" component="h1" color="primary">
        RSVP
      </Typography>
      <Container
        component={"form"}
        action={action}
        sx={{
          width: "auto",
          gap: 2,
          padding: 3,
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
        <Divider
          sx={{
            width: "100%",
            mb: 1,
          }}
        />
        <form.Field name="guests" mode="array">
          {(field) => {
            const values = field.state.value
            return values?.map((_, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
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
                            gap: 2,
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
                            sx={{
                              textAlign: "left",
                            }}
                          >
                            <FormControlLabel
                              value={"pork"}
                              control={<Radio />}
                              label="Free range Pulled Pork"
                            />
                            <Tooltip title="with ginger and coriander ">
                              <FormControlLabel
                                value={"vegan"}
                                control={<Radio />}
                                label="Miso & maple roasted aubergine (Ve)"
                                about="with ginger and coriander "
                              />
                            </Tooltip>
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
                  {values.length - 1 !== i && (
                    <Divider
                      sx={{
                        mb: 1,
                        mx: 4,
                      }}
                    />
                  )}
                </Box>
              )
            })
          }}
        </form.Field>

        <Divider
          sx={{
            width: "100%",
          }}
        />

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
      </Container>
    </>
  )
}
