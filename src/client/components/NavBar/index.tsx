"use client"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Box, IconButton, Theme } from "@mui/material"
import { SystemStyleObject } from "@mui/system"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"
import { Transition, TransitionStatus } from "react-transition-group"
import NavBarItem, { NavBarItemProps } from "../NavBarItem"

export interface NavBarItem extends Omit<NavBarItemProps, "selected"> {
  key: string
}

export interface NavBarProps {
  open: boolean
  navBarItems: NavBarItem[]
}

export default function NavBar({ open, navBarItems }: NavBarProps) {
  const [navBarOpen, setNavBarOpen] = useState(open)
  const pathName = usePathname()

  const nodeRef = useRef(null)
  const transitionStyles: Record<TransitionStatus, SystemStyleObject<Theme>> = {
    entering: {
      flexGrow: 1,
      width: "fit-content",
      maxWidth: "200px",
    },
    entered: {
      flexGrow: 1,
      width: "fit-content",
      maxWidth: "200px",
    },
    exiting: {
      width: "fit-content",
      maxWidth: "60px",
    },
    exited: {
      width: "fit-content",
      maxWidth: "60px",
    },
    unmounted: {},
  }

  return (
    <Transition nodeRef={nodeRef} in={navBarOpen} timeout={300}>
      {(state) => (
        <Box
          sx={(theme) => ({
            transition: `width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
            overflow: "hidden",
            display: "flex",
            flexFlow: "column nowrap",
            gap: theme.spacing(2),
            border: "1px grey",
            boxShadow:
              "0px 0px 0px 0px rgba(0,0,0,0.2),3px 0px 3px 0px rgba(0,0,0,0.14)",
            ...transitionStyles[state],
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

          {navBarItems.map(({ key, href, ...item }) => (
            <NavBarItem
              {...item}
              key={key}
              href={href}
              selected={href === pathName}
              hideText={!navBarOpen}
            />
          ))}
        </Box>
      )}
    </Transition>
  )
}
