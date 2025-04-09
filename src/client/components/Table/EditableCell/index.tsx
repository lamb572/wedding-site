import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import { useEffect, useState } from 'react';

interface EditableCellProps
  extends Omit<TextFieldProps, 'variant' | 'value' | 'onChange'> {
  colSpan?: number;
  value: unknown;
  onChange?: (value: unknown) => void;
  onBlur?: (value: unknown) => void;
}

export default function EditableCell({
  colSpan,
  value: initialValue,
  onChange,
  onBlur,
  children,
  ...textFieldProps
}: EditableCellProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <MuiTextField
      variant="standard"
      slotProps={{
        input: {
          sx: (theme) => ({
            '&.MuiInputBase-root, &.MuiInput-root': {
              borderBottom: '0px solid blue',
              '&:before': {
                borderBottom: `0px solid ${theme.palette.secondary.light}`,
              },
              '&:after': {
                borderBottom: `2px solid ${theme.palette.secondary.light}`,
              },
              '&:hover:before': {
                borderBottom: `2px solid ${theme.palette.secondary.light}`,
              },
            },
          }),
        },
      }}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        if (onChange) {
          onChange(newValue);
        }
      }}
      onBlur={() => {
        if (onBlur) {
          onBlur(value);
        }
      }}
      {...textFieldProps}
    >
      {children}
    </MuiTextField>
  );
}
