"use client"
import { Drawer as MuiDrawer, Theme } from "@mui/material"
import { CSSObject, styled } from "@mui/system"

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
})

export const NavDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})((props) => {
  const theme = props.theme as Theme
  return {
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
    variants: [
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        },
      },
    ],
  }
})
