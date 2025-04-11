import { Link as MuiLink } from "@mui/material"
import { LinkProps as NextLinkProps } from "next/link"
import LinkBehavior from "../LinkBehavior"

export interface LinkProps extends NextLinkProps {
  children: React.ReactNode
}

export default function Link(props: LinkProps) {
  return (
    <MuiLink component={LinkBehavior} {...props}>
      {props.children}
    </MuiLink>
  )
}
