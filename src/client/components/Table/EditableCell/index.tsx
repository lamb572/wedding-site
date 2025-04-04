import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

interface EditableCellProps
  extends Omit<TextFieldProps, 'variant' | 'value' | 'onChange'> {
  colSpan?: number;
  value: unknown;
  onChange: (value: unknown) => void;
}

export default function EditableCell({
  colSpan,
  value,
  onChange,
  children,
  ...textFieldProps
}: EditableCellProps) {
  return (
    <MuiTextField
      variant="outlined"
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      }}
      {...textFieldProps}
    >
      {children}
    </MuiTextField>
  );
}
