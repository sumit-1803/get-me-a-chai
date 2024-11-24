"use server";
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../db/mongodb'; 

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: { scope: 'read:user user:email' },
      },
      async profile(profile) {
        // Ensure email is included in the profile from GitHub
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  
  adapter: MongoDBAdapter(clientPromise), // MongoDB Adapter
  secret: process.env.NEXTAUTH_SECRET,
  
  session: {
    strategy: 'jwt',
  },
  
  callbacks: {
    async signIn({ user, account, profile }) {
      // Ensure email exists in the profile for both GitHub and Email provider
      if (profile && profile.email) {
        user.email = profile.email;
      }
      return true; // Always return true to allow sign-in
    },

    async session({ session, user }) {
       // Ensure the session object is properly populated
       if (user) {
        session.id = user.id;  // Add the user ID to the session
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        // Save user email in JWT token when user object is present
        token.email = user.email;
        token.id = user.id; 
      }
      return token;
    },
  },
  
  pages: {
    error: "/auth/error", // Custom error page URL
    signIn: "/auth/signin", // Optional: custom sign-in page URL if needed
  },
});

export { handler as GET, handler as POST };
