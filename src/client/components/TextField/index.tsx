import {
  styled,
  TextField as MuiTextField,
  TextFieldProps,
} from "@mui/material"

export const TextField = styled(MuiTextField)<TextFieldProps>({
  slotProps: {
    input: {
      sx: {
        backgroundColor: "white",
      },
    },
  },
  minWidth: "270px",
  "& .MuiOutlinedInput-input": {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 5,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#00000050",
      borderWidth: "2px",
    },

    "&:hover fieldset": {
      borderColor: "#00000070",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000000",
    },
  },
})
