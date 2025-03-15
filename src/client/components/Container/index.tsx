import { Box } from "@mui/material"
import { OverrideProps } from "@mui/material/OverridableComponent"
import { BoxTypeMap } from "@mui/system"
import { PropsWithChildren } from "react"

export interface ContainerProps
  extends OverrideProps<BoxTypeMap, React.ElementType>,
    PropsWithChildren {}

export function Container(props: ContainerProps) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid black",
        padding: 2,
        backgroundColor: "white",
        borderRadius: 4,
        ...props.sx,
      }}
    />
  )
}
