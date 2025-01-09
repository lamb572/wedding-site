import DisableDraftMode from "@/client/components/DisableDraftMode"
import ThemeWrapper from "@/client/components/ThemeWrapper"
import { client, Theme } from "@/sanity"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import type { Metadata } from "next"
import { VisualEditing } from "next-sanity"
import { Birthstone } from "next/font/google"
import { draftMode } from "next/headers"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
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
  const sanityTheme = await client.fetch<Theme | undefined>(
    '*[_type == "theme"][0]',
    {}
  )

  return (
    <html lang="en">
      <body className={leagueScript.variable}>
        <AppRouterCacheProvider>
          <ThemeWrapper sanityTheme={sanityTheme}>
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
