import * as Icons from "react-icons/md"

export type MDIcons = keyof typeof Icons

interface ISanityIconProps {
  name?: MDIcons
}

export default function SanityIcon({ name }: ISanityIconProps) {
  if (!name) return <></>
  const Icon = Icons[name]

  return <Icon />
}
