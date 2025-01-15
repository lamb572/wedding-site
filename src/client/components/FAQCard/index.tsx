"use client"

import { Card, Typography } from "@mui/material"
import { ReactNode } from "react"

export interface FAQCardProps {
  icon?: ReactNode
  answer?: string
  question?: string
}
export default function FAQCard({ answer, icon, question }: FAQCardProps) {
  return (
    <Card>
      <Typography>
        {icon} <span>{answer}</span>: {question}
      </Typography>
    </Card>
  )
}
