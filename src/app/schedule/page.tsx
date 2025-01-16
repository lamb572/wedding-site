import { ScheduleCard } from "@/client/components/ScheduleCard"
import { Card, Stack, Typography } from "@mui/material"

export default function SchedulePage() {
  return (
    <Stack>
      <Typography variant="h2" component="h1">
        Schedule
      </Typography>
      <ScheduleCard
        heading={"heading"}
        content={undefined}
        stringInterpolationData={{}}
      />
      <Card></Card>
    </Stack>
  )
}
