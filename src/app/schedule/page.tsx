import Card from "@/client/components/Card"
import { ScheduleCard } from "@/client/components/ScheduleCard"
import { getSchedules, getSettings } from "@/sanity/server"
import { CookieKeys } from "@/server/cookies/types"
import { getInviteById } from "@/server/Invite"
import { Typography } from "@mui/material"
import { cookies } from "next/headers"

export default async function SchedulePage() {
  const cookieStore = await cookies()
  const inviteId = cookieStore.get(CookieKeys.INVITE)?.value

  const invite = await getInviteById({ inviteId })

  const schedule = await getSchedules()
  const settings = await getSettings()

  const filteredSchedule = schedule?.filter(({ ceremony }) => {
    if (ceremony && invite?.ceremony) {
      return true
    }
    if (ceremony && !invite?.ceremony) {
      return false
    }
    return true
  })
  return (
    <Card backgroundColor={`${settings?.card?.backgroundColor}`}>
      <Typography variant="h3" component="h1" color="primary">
        Schedule
      </Typography>
      {filteredSchedule?.map(({ _id, heading, icon, details, time }) => {
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
