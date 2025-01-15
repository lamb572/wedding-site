import { TextBlock } from "@/utils/stringInterpolation"
import { Card, Stack, Typography } from "@mui/material"
import PortableText from "../PortableText"

export interface ScheduleCardProps {
  heading: string | undefined
  content: TextBlock | undefined
  stringInterpolationData: Record<string, string>
}

export function ScheduleCard({
  content,
  heading,
  stringInterpolationData,
}: ScheduleCardProps) {
  return (
    <Card>
      <Stack>
        <Typography variant="h3" component="h3">
          {heading}
        </Typography>
        <Stack
          sx={{
            alignItems: "center",
          }}
        >
          <PortableText
            value={content as TextBlock}
            stringInterpolationData={stringInterpolationData}
          />
        </Stack>
      </Stack>
    </Card>
  )
}
