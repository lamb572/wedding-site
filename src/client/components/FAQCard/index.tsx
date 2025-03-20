"use client"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material"
import { ReactNode } from "react"

export interface FAQCardProps {
  icon?: ReactNode
  answer?: string
  question?: string
}
export default function FAQCard({ answer, icon, question }: FAQCardProps) {
  return (
    <Accordion
      sx={(theme) => ({
        color: theme.palette.primary.dark,
        border: "1px solid",
        alignSelf: "flex-start",
        width: "100%",
      })}
    >
      <AccordionSummary
        aria-controls="faq-answer"
        id="faq-question"
        expandIcon={<ExpandMoreIcon />}
      >
        {icon}
        <Typography component="span" sx={{ pl: 2 }}>
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails id="faq-answer">
        <Typography>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}
