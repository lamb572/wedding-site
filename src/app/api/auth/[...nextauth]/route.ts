import NextAuth from "next-auth";
import { authOptionsWithCallbacks } from "@/auth";

const handler = NextAuth(authOptionsWithCallbacks);
export { handler as GET, handler as POST };
