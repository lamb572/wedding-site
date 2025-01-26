import DisableDraftMode from "@/client/components/DisableDraftMode"
import NavBar, { NavBarItem } from "@/client/components/NavBar"
import ThemeWrapper from "@/client/components/ThemeWrapper"
import { getSanityTheme } from "@/sanity/server"
import { getSettings } from "@/sanity/server/getSettings"
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard"
import HomeIcon from "@mui/icons-material/Home"
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"
import RsvpIcon from "@mui/icons-material/Rsvp"
import ScheduleIcon from "@mui/icons-material/Schedule"
import { Box } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { VisualEditing } from "next-sanity"
import { Birthstone } from "next/font/google"
import { draftMode } from "next/headers"
import "./globals.css"

const leagueScript = Birthstone({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-birthstone",
})

export const metadata: Metadata = {
  title: "L+B Wedding",
  description: "Luke and Bernadette's wedding website",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const sanityTheme = await getSanityTheme()
  const sanitySettings = await getSettings()
  const pageNames = sanitySettings?.pageNames
  const showNav = Boolean(process.env.NEXT_MAIN_SITE_FLAG)

  const navBarItems: NavBarItem[] = [
    // {
    //   key: "save-date",
    //   href: "/save-date",
    //   text: "Save Date",
    // },
    {
      key: "home",
      href: "/",
      text: pageNames?.home,
      icon: <HomeIcon color="primary" />,
    },
    {
      key: "schedule",
      href: "/schedule",
      text: pageNames?.schedule,
      icon: <ScheduleIcon color="primary" />,
    },
    {
      key: "travel",
      href: "/travel",
      text: pageNames?.travel,
      icon: <ModeOfTravelIcon color="primary" />,
    },
    {
      key: "rsvp",
      href: "/rsvp",
      text: pageNames?.rsvp,
      icon: <RsvpIcon color="primary" />,
    },
    {
      key: "faq",
      href: "/faq",
      text: pageNames?.faq,
      icon: <QuestionMarkIcon color="primary" />,
    },
    {
      key: "registry",
      href: "/registry",
      text: pageNames?.registry,
      icon: <CardGiftcardIcon color="primary" />,
    },
  ]
  const settings = await getSettings()

  return (
    <html lang="en">
      <body className={leagueScript.variable}>
        <AppRouterCacheProvider>
          <ThemeWrapper sanityTheme={sanityTheme}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                width: "100%",
                backgroundColor: settings?.background?.color,
              }}
            >
              {showNav && <NavBar navBarItems={navBarItems} />}
              {children}
            </Box>
            <Analytics />
            <SpeedInsights />
            {(await draftMode()).isEnabled && (
              <>
                <VisualEditing />
                <DisableDraftMode />
              </>
            )}
          </ThemeWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
