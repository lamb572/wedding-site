import DisableDraftMode from "@/client/components/DisableDraftMode"
import NavBar, { NavBarItem } from "@/client/components/NavBar"
import ThemeWrapper from "@/client/components/ThemeWrapper"
import { getSanityTheme } from "@/sanity/server"
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
    },
    {
      key: "schedule",
      href: "/schedule",
      text: "Schedule",
    },
    {
      key: "travel",
      href: "/travel",
      text: "Travel & Accommodation",
    },
    {
      key: "rsvp",
      href: "/rsvp",
      text: "RSVP",
    },
    {
      key: "faq",
      href: "/faq",
      text: "FAQ",
    },
    {
      key: "registry",
      href: "/registry",
      text: "Registry",
    },
  ]

  return (
    <html lang="en">
      <body className={leagueScript.variable}>
        <AppRouterCacheProvider>
          <ThemeWrapper sanityTheme={sanityTheme}>
            <NavBar open={showNav} navBarItems={navBarItems} />
            {children}
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
