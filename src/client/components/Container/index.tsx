import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { BoxProps } from "@mui/system"

export const Container = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid black",
  padding: theme.spacing(2),
  backgroundColor: "white",
  borderRadius: theme.spacing(4),
}))
