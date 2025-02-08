"use client"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import NavBarItem, { NavBarItemProps } from "../NavBarItem"
import { NavDrawer } from "./NavDrawer"

export interface NavBarItem extends Omit<NavBarItemProps, "selected"> {
  key: string
}

export interface NavBarProps {
  navBarItems: NavBarItem[]
}

export default function NavBar({ navBarItems }: NavBarProps) {
  const [inviteId, setInviteId] = useState<string>()
  const isNotMobile = useMediaQuery((theme) => theme.breakpoints.up("sm"))
  const [navBarOpen, setNavBarOpen] = useState(isNotMobile)
  const pathName = usePathname()

  const handleItemClick = () => {
    setNavBarOpen(false)
  }

  useEffect(() => {
    const id = window.localStorage.getItem("inviteId")
    console.log("id", id)
    if (id) {
      setInviteId(id)
    }
  }, [])

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

        {navBarItems.map(({ key, href, ...item }) => {
          return (
            <NavBarItem
              {...item}
              key={key}
              href={key === "rsvp" ? `/rsvp/${inviteId}` : href}
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
