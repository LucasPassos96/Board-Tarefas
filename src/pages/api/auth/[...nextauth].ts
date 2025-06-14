import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // authorization: {
            //     params: {
            //         prompt: "select_account", // Sempre pede para escolher a conta
            //     },
            // }
        })
    ],
    // secret: process.env.JWT_SECRET as string,
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET as string
    
}

export default NextAuth(authOptions);