"use client"
import { TextField } from "@/client/components/TextField"
import { Guest, guestSchema } from "@/server/getGuestByInviteId/types"
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material"
import { useForm } from "@tanstack/react-form"

export interface RSVPIdViewProps {
  guest: Omit<Guest, "_id" | "inviteId">
}

export default function RSVPIdView({ guest }: RSVPIdViewProps) {
  const form = useForm({
    defaultValues: {
      name: guest.name ?? "",
      attending: guest.attending ?? false,
      foodAllergies: guest.foodAllergies ?? "",
      companions: guest.companions ?? [],
      phoneNumber: guest.phoneNumber ?? "",
    },
    validators: {
      onChange: guestSchema.omit({ _id: true, inviteId: true }),
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
      }}
    >
      <Typography variant="h2" component="h1" color="primary">
        RSVP
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form.Field name="name">
          {(field) => {
            const errors = field.state.meta.errors
            const isErrors = errors.length > 0
            return (
              <TextField
                // sx={{
                //   "& .MuiOutlinedInput-notchedOutline": {
                //     borderWidth: "2px",
                //     borderColor: "#00000070",
                //     "&:hover": {
                //       borderColor: "#00000090",
                //     },
                //   },
                // }}
                // slotProps={{
                //   input: {
                //     sx: {
                //       backgroundColor: "white",
                //     },
                //   },
                // }}
                error={isErrors}
                helperText={errors.join(", ")}
                label="Guest Name"
                variant="outlined"
                name="name"
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )
          }}
        </form.Field>
        <form.Field name="companions" mode="array">
          {(field) => {
            return field.state.value?.map((_, i) => {
              return (
                <form.Field key={i} name={`companions[${i}].name`}>
                  {(subField) => {
                    return (
                      <TextField
                        value={subField.state.value}
                        onChange={(e) => subField.handleChange(e.target.value)}
                        label="Guest Name"
                        variant="outlined"
                        name={`companions-${i}`}
                        type="text"
                      />
                    )
                  }}
                </form.Field>
              )
            })
          }}
        </form.Field>
        <form.Field name="phoneNumber">
          {(field) => {
            const errors = field.state.meta.errors
            const isErrors = errors.length > 0
            return (
              <TextField
                error={isErrors}
                helperText={errors.join(", ")}
                label="Contact Number"
                variant="outlined"
                name="phoneNumber"
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )
          }}
        </form.Field>
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
        <form.Field name="foodAllergies">
          {(field) => {
            const errors = field.state.meta.errors
            const isErrors = errors.length > 0
            return (
              <TextField
                error={isErrors}
                helperText={errors.join(", ")}
                label="Food Allergies"
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
            >
              Submit
            </Button>
          )}
        </form.Subscribe>
      </Box>
    </Box>
  )
}
