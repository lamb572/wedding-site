import NextAuth from 'next-auth';
import { authOptions } from './auth.config';
import { getUser } from './server/users/getUsers';
import type { NextAuthOptions } from 'next-auth';

export const authOptionsWithCallbacks: NextAuthOptions = {
  ...authOptions,
  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email;

      if (!email) {
        return encodeURI('/admin/signin/?error=Email not found');
      }

      const user = await getUser({ email });
      if (!user) {
        return encodeURI('/admin/signin/?error=unauthorized');
      }

      return true;
    },
  },
};

export default NextAuth(authOptionsWithCallbacks);
