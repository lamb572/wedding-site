"use client"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Box, IconButton } from "@mui/material"
import { usePathname } from "next/navigation"
import { useState } from "react"
import NavBarItem, { NavBarItemProps } from "../../../components/NavBarItem"
import { NavDrawer } from "./NavDrawer"

export interface NavBarItem extends Omit<NavBarItemProps, "selected"> {
  key: string
  inviteIdRequired?: boolean
}

export interface NavBarProps {
  navBarItems: NavBarItem[]
  inviteId?: string
}

export default function NavBar({ navBarItems, inviteId }: NavBarProps) {
  const [navBarOpen, setNavBarOpen] = useState(false)
  const pathName = usePathname()

  const handleItemClick = () => {
    setNavBarOpen(false)
  }

  return (
    <NavDrawer variant="permanent" open={navBarOpen}>
      <Box
        sx={(theme) => ({
          height: "100%",
          backgroundColor: " #DFE1D5",
          overflow: "hidden",
          display: "flex",
          flexFlow: "column nowrap",
          gap: theme.spacing(2),
        })}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(0, 1),
            borderBottom: "rgba(0,0,0,0.2) solid",
            ...theme.mixins.toolbar,
            justifyContent: navBarOpen ? "flex-end" : "flex-start",
          })}
        >
          <IconButton onClick={() => setNavBarOpen((c) => !c)}>
            {navBarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>

        {navBarItems.map(({ key, href, inviteIdRequired, ...item }) => {
          return (
            <NavBarItem
              {...item}
              key={key}
              href={
                inviteIdRequired && !inviteId ? `/invite?forward=${href}` : href
              }
              selected={href === pathName}
              hideText={!navBarOpen}
              onClick={handleItemClick}
            />
          )
        })}
      </Box>
    </NavDrawer>
  )
}
