import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

// Every Next.js route is a serverless route
// serverless -> lambda
// Only opens up when it's called
// Every time it gets called, it spins up a server, and makes a connection to the database
// This is so that a server doesn't have to constantly be running

console.log({
	clientId: process.env.GOOGLE_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({
				email: session.user.email,
			});

			session.user.id = sessionUser._id.toString();

			return session;
		},
		async signIn({ profile }) {
			try {
				await connectToDB();

				// Check if user exists
				const userExists = await User.findOne({
					email: profile.email,
				});

				// If not, create user and save to database
				if (!userExists) {
					await User.create({
						email: profile.email,
						username: profile.name.replace(" ", "").toLowerCase(),
						image: profile.picture,
					});
				}

				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
