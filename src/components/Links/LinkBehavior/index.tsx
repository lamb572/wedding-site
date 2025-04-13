import { default as NextLink, LinkProps as NextLinkProps } from "next/link"
import { forwardRef } from "react"

const LinkBehavior = forwardRef<HTMLAnchorElement, NextLinkProps>(
  (props, ref) => {
    return <NextLink {...props} passHref ref={ref} />
  }
)

export default LinkBehavior
