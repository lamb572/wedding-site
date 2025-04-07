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
import { Prata } from "next/font/google"
import { draftMode } from "next/headers"
import "./globals.css"
import { getUserInviteCookie } from "@/server/cookies"
import { imageLoader } from "@/sanity"

const leagueScript = Prata({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-prata",
})

export const metadata: Metadata = {
  title: "L+B Wedding",
  description: "Luke and Bernadette's wedding website",
}

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  const sanityTheme = await getSanityTheme()
  const sanitySettings = await getSettings()
  const pageNames = sanitySettings?.pageNames
  const ogImage = imageLoader({
    source: sanitySettings?.images?.ogImage?.asset,
  })
  const showNav = Boolean(process.env.NEXT_MAIN_SITE_FLAG)

  const inviteCookie = await getUserInviteCookie()
  const id = inviteCookie?.value

  const navBarItems: NavBarItem[] = [
    // {
    //   key: "save-date",
    //   href: "/save-date",
    //   text: "Save Date",
    // },
    // {
    //   key: "invite",
    //   href: "/invite",
    //   text: "invite",
    //   icon: <HomeIcon color="primary" />,
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
      inviteIdRequired: true,
    },
    {
      key: "travel",
      href: "/travel",
      text: pageNames?.travel,
      icon: <ModeOfTravelIcon color="primary" />,
      inviteIdRequired: true,
    },
    {
      key: "rsvp",
      href: "/rsvp",
      text: pageNames?.rsvp,
      icon: <RsvpIcon color="primary" />,
      inviteIdRequired: true,
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
      <meta property="og:image" content={ogImage} />
      <meta name="robots" content="noindex, nofollow" />
      <body className={leagueScript.variable}>
        <AppRouterCacheProvider>
          <ThemeWrapper sanityTheme={sanityTheme}>
            {modal}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                minHeight: "100%",
                width: "100%",
                backgroundColor: settings?.background?.color,
              }}
            >
              {showNav && <NavBar navBarItems={navBarItems} inviteId={id} />}
              <Box
                sx={{
                  maxWidth: "calc(100% - calc(7 * var(--mui-spacing, 8px)))",
                  width: "100%",
                  minHeight: "100%",
                  overflowX: "hidden",
                  wordBreak: "break-word",
                  display: "flex",
                }}
              >
                {children}
              </Box>
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
