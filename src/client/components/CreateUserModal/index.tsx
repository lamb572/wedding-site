import { Container } from '@/components';
import { guestSchema } from '@/server/Invite';
import { createInvite } from '@/server/Invite/createInvite';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { z } from 'zod';

const createUserFormSchema = z.object({
  ceremony: z.boolean(),
  guests: z.array(guestSchema),
});

export default function CreateUserModal() {
  const [open, setOpen] = useState(false);
  const [invite, setInvite] = useState<string>();

  const form = useForm({
    defaultValues: {
      ceremony: false,
      guests: [
        {
          name: '',
        },
      ],
    },
    validators: {
      onChange: createUserFormSchema,
    },
    onSubmit: async (formData) => {
      const invite = await createInvite({
        ...formData.value,
      });
      setInvite(`https://www.beach-wedding.org/invite/${invite.inviteId}`);
    },
  });

  const handleClear = () => {
    form.reset();
    setInvite(undefined);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Create Invite
      </Button>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          handleClear();
        }}
      >
        <DialogTitle>Create Invite</DialogTitle>
        <DialogContent>
          <Container
            component={'form'}
            sx={{
              width: 'auto',
              maxWidth: '100%',
              gap: 2,
              padding: 3,
            }}
          >
            <form.Field name="ceremony">
              {(field) => {
                return (
                  <FormControl>
                    <FormLabel>Ceremony</FormLabel>
                    <RadioGroup
                      aria-labelledby="ceremony"
                      value={field.state.value ? 'true' : 'false'}
                      name="ceremony-group"
                      onChange={(_e, value) =>
                        field.handleChange(Boolean(value === 'true'))
                      }
                    >
                      <FormControlLabel
                        value={'true'}
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={'false'}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                );
              }}
            </form.Field>
            <Divider
              sx={{
                width: '100%',
                mb: 1,
              }}
            />
            <form.Field name="guests" mode="array">
              {(field) => {
                const values = field.state.value;
                return (
                  <>
                    {values?.map((_, i) => {
                      return (
                        <Box
                          key={i}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            borderRadius: 4,
                            maxWidth: '-webkit-fill-available',
                          }}
                        >
                          <FormLabel>Guest {i + 1}</FormLabel>
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
                                  name={`name-${i}`}
                                  type="text"
                                />
                              );
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
                      );
                    })}
                    <Stack direction="row" gap={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          field.pushValue({
                            name: '',
                          })
                        }
                      >
                        Add
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => field.removeValue(values.length - 1)}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </>
                );
              }}
            </form.Field>

            <Divider
              sx={{
                width: '100%',
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
                <Stack direction="row" gap={2}>
                  <Button
                    type="submit"
                    variant="outlined"
                    disabled={!canSubmit}
                    loading={isSubmitting || isFieldsValidating}
                    onClick={form.handleSubmit}
                  >
                    Submit
                  </Button>
                  <Button variant="contained" onClick={handleClear}>
                    Clear
                  </Button>
                </Stack>
              )}
            </form.Subscribe>
            {invite && (
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  wordBreak: 'break-all',
                }}
              >
                Invite Link:{' '}
                <a href={invite} target="_blank" rel="noopener noreferrer">
                  {invite}
                </a>
              </Typography>
            )}
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
}
