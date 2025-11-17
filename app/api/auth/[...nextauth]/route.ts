import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Add your Gmail address here - only this email will have admin access
const ADMIN_EMAIL = "your-email@gmail.com" // CHANGE THIS TO YOUR GMAIL

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow your specific Gmail address to sign in
      if (user.email === ADMIN_EMAIL) {
        return true
      }
      return false // Reject all other emails
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email
      }
      return session
    },
  },
  pages: {
    signIn: '/admin',
    error: '/admin',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
