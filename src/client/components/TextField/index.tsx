import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

export function TextField(props: TextFieldProps) {
  return (
    <MuiTextField
      {...props}
      slotProps={{
        ...props.slotProps,
        input: { sx: { backgroundColor: 'white' } },
      }}
      sx={{
        width: { xs: '220px', sm: '270px' },
        maxWidth: '100%',
        '& .MuiOutlinedInput-input': {
          backgroundColor: 'white',
          borderRadius: 5,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: '#00000050', borderWidth: '2px' },

          '&:hover fieldset': { borderColor: '#00000070' },
          '&.Mui-focused fieldset': { borderColor: '#000000' },
        },

        ...props.sx,
      }}
    />
  );
}
