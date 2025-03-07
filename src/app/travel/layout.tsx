import { PropsWithChildren } from "react"

export interface TravelLayoutProps extends PropsWithChildren {}

export default function TravelLayout({ children }: TravelLayoutProps) {
  return <>{children}</>
}
