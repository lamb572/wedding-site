import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord],
  callbacks: {
    signIn({ profile }) {
      const email = profile?.email
      // todo: if email is in users
      // todo: update user in db
      // todo: allow user to sign in

      // todo: if email is not in users
      // todo: return false/error

      return true
    },
  },
})
