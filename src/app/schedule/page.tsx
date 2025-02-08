import Card from "@/client/components/Card"
import { ScheduleCard } from "@/client/components/ScheduleCard"
import { getSchedules, getSettings } from "@/sanity/server"
import { Typography } from "@mui/material"

export default async function SchedulePage() {
  const schedule = await getSchedules()
  const settings = await getSettings()
  return (
    <Card backgroundColor={`${settings?.card?.backgroundColor}`}>
      <Typography variant="h3" component="h1" color="primary">
        FAQ&apos;s
      </Typography>
      {schedule?.map(({ _id, heading, icon, details, time }) => {
        return (
          <ScheduleCard
            key={_id}
            heading={heading}
            details={details}
            icon={icon}
            time={time}
          />
        )
      })}
    </Card>
  )
}
