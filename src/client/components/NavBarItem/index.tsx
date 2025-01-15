import { ListItem, ListItemButton, ListItemText } from "@mui/material"
import LinkBehavior from "../Links/LinkBehavior"

export interface NavBarItemProps {
  href: string
  text: string
  selected?: boolean
}

export default function NavBarItem({ href, text, selected }: NavBarItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton component={LinkBehavior} href={href} disabled={selected}>
        <ListItemText
          primary={text}
          slotProps={{
            primary: {
              color: "primary",
              variant: "h5",
              fontWeight: "bold",
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}
