import { PropsWithChildren } from "react"

export interface SaveTheDateLayoutProps extends PropsWithChildren {}

export default function SaveTheDateLayout({
  children,
}: SaveTheDateLayoutProps) {
  return <div>{children}</div>
}
