"use client"
import { Loader } from "@googlemaps/js-api-loader"
import { Box, Link, Typography } from "@mui/material"
import { useEffect, useRef } from "react"
import { renderToString } from "react-dom/server"

export interface GoogleMapOptions {
  center?: {
    lat: number | string
    lng: number | string
  }
  zoom?: number
}

export interface GoogleMapProps {
  mapOptions: google.maps.MapOptions
}

const BreweryId = "ChIJm0BTcB6Ec0gRcv_8d8i6Z94"
const CeremonyId = "ChIJZSWaQsl2dEgRYJgu5_nV3lM"
const southamptonLocation = {
  center: {
    lat: 50.9097,
    lng: -1.4044,
  },
  zoom: 11,
}

export default function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
      version: "weekly",
      libraries: ["places", "marker"],
    })
    const currentRef = mapRef.current

    if (!currentRef) return

    const celebrate = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
      <path d="M155.6 17.3C163 3 179.9-3.6 195 1.9L320 47.5l125-45.6c15.1-5.5 32 1.1 39.4 15.4l78.8 152.9c28.8 55.8 10.3 122.3-38.5 156.6L556.1 413l41-15c16.6-6 35 2.5 41 19.1s-2.5 35-19.1 41l-71.1 25.9L476.8 510c-16.6 6.1-35-2.5-41-19.1s2.5-35 19.1-41l41-15-31.3-86.2c-59.4 5.2-116.2-34-130-95.2L320 188.8l-14.6 64.7c-13.8 61.3-70.6 100.4-130 95.2l-31.3 86.2 41 15c16.6 6 25.2 24.4 19.1 41s-24.4 25.2-41 19.1L92.2 484.1 21.1 458.2c-16.6-6.1-25.2-24.4-19.1-41s24.4-25.2 41-19.1l41 15 31.3-86.2C66.5 292.5 48.1 226 76.9 170.2L155.6 17.3zm44 54.4l-27.2 52.8L261.6 157l13.1-57.9L199.6 71.7zm240.9 0L365.4 99.1 378.5 157l89.2-32.5L440.5 71.7z" />
    </svg>`
    const placeOfWorship = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M224 109.3l0 108.3L183.3 242c-14.5 8.7-23.3 24.3-23.3 41.2L160 512l96 0 0-96c0-35.3 28.7-64 64-64s64 28.7 64 64l0 96 96 0 0-228.8c0-16.9-8.8-32.5-23.3-41.2L416 217.6l0-108.3c0-8.5-3.4-16.6-9.4-22.6L331.3 11.3c-6.2-6.2-16.4-6.2-22.6 0L233.4 86.6c-6 6-9.4 14.1-9.4 22.6zM24.9 330.3C9.5 338.8 0 354.9 0 372.4L0 464c0 26.5 21.5 48 48 48l80 0 0-238.4L24.9 330.3zM592 512c26.5 0 48-21.5 48-48l0-91.6c0-17.5-9.5-33.6-24.9-42.1L512 273.6 512 512l80 0z"/></svg>`
    const parser = new DOMParser()
    const celebrateSvg = parser.parseFromString(
      celebrate,
      "image/svg+xml"
    ).documentElement
    const placeOfWorshipSvg = parser.parseFromString(
      placeOfWorship,
      "image/svg+xml"
    ).documentElement
    const initMap = async () => {
      try {
        const { Map } = await loader.importLibrary("maps")
        const map = new Map(currentRef, {
          ...southamptonLocation,
          mapId: process.env.NEXT_PUBLIC_MAP_ID,
        })
        const { AdvancedMarkerElement, PinElement } =
          await loader.importLibrary("marker")

        const { Place } = await loader.importLibrary("places")

        const ceremony = new Place({ id: CeremonyId })
        await ceremony.fetchFields({
          fields: ["location", "displayName", "formattedAddress"],
        })

        const reception = new Place({ id: BreweryId })
        await reception.fetchFields({
          fields: ["location", "displayName", "formattedAddress"],
        })

        const receptionContent = renderToString(
          <Box>
            <Typography variant="h3">{reception.displayName}</Typography>
            <Typography variant="body1">
              {reception.formattedAddress}
            </Typography>
            <Link
              target="_blank"
              href={`http://maps.google.com/?q=${reception.formattedAddress}`}
            >
              Google Map
            </Link>
          </Box>
        )
        const receptionInfoWindow = new google.maps.InfoWindow({
          content: receptionContent,
          ariaLabel: reception.displayName,
        })

        const receptionElement = new PinElement({
          glyph: celebrateSvg,
        })

        const receptionMarker = new AdvancedMarkerElement({
          map,
          position: reception.location,
          content: receptionElement.element,
          title: reception.displayName,
        })

        receptionMarker.addListener("click", () => {
          receptionInfoWindow.open({
            anchor: receptionMarker,
            map,
          })
        })
        const ceremonyContent = renderToString(
          <Box>
            <Typography variant="h3">{ceremony.displayName}</Typography>
            <Typography variant="body1">{ceremony.formattedAddress}</Typography>
            <Link
              target="_blank"
              href={`http://maps.google.com/?q=${ceremony.formattedAddress}`}
            >
              Google Map
            </Link>
          </Box>
        )
        const ceremonyInfoWindow = new google.maps.InfoWindow({
          content: ceremonyContent,
          ariaLabel: ceremony.displayName,
        })

        const ceremonyElement = new PinElement({
          // background: "",
          glyph: placeOfWorshipSvg,
        })

        const ceremonyMarker = new AdvancedMarkerElement({
          map,
          position: ceremony.location,
          content: ceremonyElement.element,
          title: ceremony.displayName,
        })

        ceremonyMarker.addListener("click", () => {
          ceremonyInfoWindow.open({
            anchor: ceremonyMarker,
            map,
          })
        })
      } catch (err) {
        console.error(err)
      }
    }
    initMap()

    return () => {}
  }, [])

  return (
    <Box
      ref={mapRef}
      sx={{
        width: "100%",
        height: "400px",
      }}
    />
  )
}
