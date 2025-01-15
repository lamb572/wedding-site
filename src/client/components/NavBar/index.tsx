import { Drawer } from "@mui/material"
import NavBarItem from "../NavBarItem"

export interface NavBarItem {
  href: string
  text: string
  key: string
}

export interface NavBarProps {
  open: boolean
  navBarItems: NavBarItem[]
}

export default function NavBar({ open, navBarItems }: NavBarProps) {
  return (
    <Drawer open={open}>
      {navBarItems.map(({ key, ...item }) => (
        <NavBarItem {...item} key={key} />
      ))}
    </Drawer>
  )
}
