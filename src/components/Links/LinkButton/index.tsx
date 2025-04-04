import { Button, ButtonProps } from "@mui/material"
import LinkBehavior from "../LinkBehavior"

export interface LinkButtonProps extends ButtonProps {}

export default function LinkButton(props: ButtonProps) {
  return <Button component={LinkBehavior} {...props} />
}
