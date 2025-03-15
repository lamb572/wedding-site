"use client"
import { Schedule } from "@/sanity"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material"
import SanityIcon from "../SanityIcon"
import { format } from "date-fns"
import PortableText from "../PortableText"
import { TextBlock } from "@/utils/stringInterpolation"
import { useState } from "react"

export interface ScheduleCardProps
  extends Pick<Schedule, "details" | "heading" | "time" | "icon"> {}

export function ScheduleCard({
  details,
  icon,
  time,
  heading,
}: ScheduleCardProps) {
  const [expanded, setExpanded] = useState<boolean>(false)
  const localTime = time ? new Date(time) : ""

  const isDetails = details && details.length > 0

  return (
    <Accordion
      sx={(theme) => ({
        color: theme.palette.primary.dark,
        border: "1px solid",
        alignSelf: "flex-start",
        width: "100%",
      })}
      expanded={expanded}
      onChange={() => (isDetails ? setExpanded(!expanded) : undefined)}
    >
      <AccordionSummary
        aria-controls="faq-answer"
        id="faq-question"
        expandIcon={isDetails ? <ExpandMoreIcon /> : undefined}
      >
        {<SanityIcon icon={icon} />}
        <Typography component="span" sx={{ pl: 2 }}>
          {`${format(localTime, "HH:mm")} - ${heading}`}
        </Typography>
      </AccordionSummary>
      {isDetails && (
        <AccordionDetails id="faq-answer">
          <Box sx={{ textAlign: "left" }}>
            <PortableText value={(details ?? []) as TextBlock} />
          </Box>
        </AccordionDetails>
      )}
    </Accordion>
  )
}
