"use client"
import { Drawer } from "@mui/material"
import NavBarItem, { NavBarItemProps } from "../NavBarItem"
import { usePathname } from "next/navigation"

export interface NavBarItem extends Omit<NavBarItemProps, "selected"> {
  key: string
}

export interface NavBarProps {
  open: boolean
  navBarItems: NavBarItem[]
}

export default function NavBar({ open, navBarItems }: NavBarProps) {
  const pathName = usePathname()

  return (
    <Drawer open={open}>
      {navBarItems.map(({ key, href, ...item }) => (
        <NavBarItem
          {...item}
          key={key}
          href={href}
          selected={href === pathName}
        />
      ))}
    </Drawer>
  )
}
