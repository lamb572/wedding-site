import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import LinkBehavior from "../Links/LinkBehavior"

export interface NavBarItemProps {
  href: string
  text: string | undefined
  selected?: boolean
  icon?: React.ReactNode
  hideIcon?: boolean
  hideText?: boolean
}

export default function NavBarItem({
  href,
  text,
  selected,
  icon,
  hideIcon,
  hideText,
}: NavBarItemProps) {
  return (
    <ListItem
      disablePadding
      sx={{
        minHeight: "50px",
      }}
    >
      <ListItemButton
        sx={{
          overflow: "hidden",
        }}
        component={LinkBehavior}
        href={href}
        disabled={selected}
      >
        {!hideIcon && <ListItemIcon>{icon}</ListItemIcon>}
        {!hideText && (
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
        )}
      </ListItemButton>
    </ListItem>
  )
}
