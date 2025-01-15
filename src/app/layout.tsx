import DisableDraftMode from "@/client/components/DisableDraftMode"
import NavBar, { NavBarItem } from "@/client/components/NavBar"
import ThemeWrapper from "@/client/components/ThemeWrapper"
import { getSanityTheme } from "@/sanity/server"
import { Box } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { VisualEditing } from "next-sanity"
import { Birthstone } from "next/font/google"
import { draftMode } from "next/headers"
import HomeIcon from "@mui/icons-material/Home"
import ScheduleIcon from "@mui/icons-material/Schedule"
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel"
import RsvpIcon from "@mui/icons-material/Rsvp"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard"
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
      text: "Home",
      icon: <HomeIcon color="primary" />,
    },
    {
      key: "schedule",
      href: "/schedule",
      text: "Schedule",
      icon: <ScheduleIcon color="primary" />,
    },
    {
      key: "travel",
      href: "/travel",
      text: "Travel & Accommodation",
      icon: <ModeOfTravelIcon color="primary" />,
    },
    {
      key: "rsvp",
      href: "/rsvp",
      text: "RSVP",
      icon: <RsvpIcon color="primary" />,
    },
    {
      key: "faq",
      href: "/faq",
      text: "FAQ",
      icon: <QuestionMarkIcon color="primary" />,
    },
    {
      key: "registry",
      href: "/registry",
      text: "Registry",
      icon: <CardGiftcardIcon color="primary" />,
    },
  ]

  return (
    <html lang="en">
      <body className={leagueScript.variable}>
        <AppRouterCacheProvider>
          <ThemeWrapper sanityTheme={sanityTheme}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                height: "100%",
                width: "100%",
              }}
            >
              {showNav && <NavBar open={showNav} navBarItems={navBarItems} />}
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
