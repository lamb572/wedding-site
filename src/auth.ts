import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import { getUser } from "./server/users/getUsers"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord],
  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email

      if (!email) {
        return encodeURI("/admin/signin/?error=Email not found")
      }

      const user = await getUser({ email })
      if (!user) {
        return encodeURI("/admin/signin/?error=unauthorized")
      }

      return true
    },
  },
})
