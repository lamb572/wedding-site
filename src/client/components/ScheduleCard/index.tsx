"use client"
import { Schedule } from "@/sanity"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material"
import SanityIcon from "../SanityIcon"
import { format } from "date-fns"

export interface ScheduleCardProps
  extends Pick<Schedule, "details" | "heading" | "time" | "icon"> {}

export function ScheduleCard({
  details,
  icon,
  time,
  heading,
}: ScheduleCardProps) {
  const localTime = time ? new Date(time) : ""
  return (
    <Accordion
      sx={(theme) => ({
        color: theme.palette.primary.dark,
        border: "1px solid",
      })}
    >
      <AccordionSummary
        aria-controls="faq-answer"
        id="faq-question"
        expandIcon={<ExpandMoreIcon />}
      >
        {<SanityIcon icon={icon} />}
        <Typography component="span" sx={{ pl: 2 }}>
          {`${format(localTime, "h:mm aaa")} - ${heading}`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails id="faq-answer">
        <Typography>{details}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}
