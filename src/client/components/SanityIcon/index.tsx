"use client"
import { IconPicker } from "@/sanity"
import { SvgIcon } from "@mui/material"
import { useEffect, useRef } from "react"

interface ISanityIconProps {
  icon?: IconPicker
}

export default function SanityIcon({ icon }: ISanityIconProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const svgString = icon?.svg

  useEffect(() => {
    const svg = svgRef.current
    if (!svgString) return
    if (svg) {
      const parser = new DOMParser()

      const doc = parser.parseFromString(svgString, "image/svg+xml")
      svg.innerHTML = doc.documentElement.outerHTML
    }
  }, [svgString])

  return <SvgIcon ref={svgRef} />
}
