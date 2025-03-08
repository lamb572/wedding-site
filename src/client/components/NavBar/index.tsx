"use client"
import { getUserInviteCookie } from "@/server/cookies/inviteId"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Box, IconButton } from "@mui/material"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import NavBarItem, { NavBarItemProps } from "../NavBarItem"
import { NavDrawer } from "./NavDrawer"

export interface NavBarItem extends Omit<NavBarItemProps, "selected"> {
  key: string
  inviteIdRequired?: boolean
}

export interface NavBarProps {
  navBarItems: NavBarItem[]
}

export default function NavBar({ navBarItems }: NavBarProps) {
  const [inviteId, setInviteId] = useState<string>()
  const [navBarOpen, setNavBarOpen] = useState(false)
  const pathName = usePathname()

  const handleItemClick = () => {
    setNavBarOpen(false)
  }

  useEffect(() => {
    const getId = async () => {
      const inviteCookie = await getUserInviteCookie()
      const id = inviteCookie?.value
      if (id) {
        setInviteId(id)
      }
    }
    getId()
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
