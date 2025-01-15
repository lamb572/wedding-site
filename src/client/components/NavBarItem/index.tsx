import { ListItem, ListItemButton, ListItemText } from "@mui/material"
import LinkBehavior from "../Links/LinkBehavior"

export interface NavBarItemProps {
  href: string
  text: string
}

export default function NavBarItem({ href, text }: NavBarItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton component={LinkBehavior} href={href}>
        <ListItemText
          primary={text}
          slotProps={{
            primary: {
              color: "primary",
              variant: "h5",
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}
