import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';
import User from '../../../models/User';
import connectDB from '../../../db/connectDB';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: { scope: 'read:user user:email' },
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
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectDB();

      console.log("SignIn Callback:");
      console.log("Email:", email);
      console.log("Profile:", profile);

      let userEmail = email;

      if (!userEmail && account.provider === 'github') {
        console.log("Fetching email from GitHub API...");
        const res = await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `token ${account.access_token}`,
          },
        });
        const emails = await res.json();
        console.log("Emails fetched from GitHub API:", emails);

        if (emails && emails.length > 0) {
          const primaryEmail = emails.find((email) => email.primary && email.verified);
          userEmail = primaryEmail ? primaryEmail.email : emails[0].email;
        }
      }

      if (userEmail) {
        console.log("User email found:", userEmail);
        const currentUser = await User.findOne({ email: userEmail });
        if (!currentUser) {
          const newUser = new User({
            email: userEmail,
            username: profile.login,
          });
          await newUser.save();
          console.log("New user created:", newUser);
        }
        return true;
      } else {
        console.log("User email not found.");
        return false;
      }
    },
    async session({ session, user, token }) {
      await connectDB();

      const dbUser = await User.findOne({ email: session.user.email });
      session.user.name = dbUser.username;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
