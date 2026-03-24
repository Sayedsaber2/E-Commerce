import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authoptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Shop-Mart",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "ahmed@gmail.com" },
                password: { label: "password", type: "password" }
            },
            async authorize(data) {
                const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                    method: "POST",
                    body: JSON.stringify({ email: data?.email, password: data?.password }),
                    headers: { "Content-Type": "application/json" }
                })

                const payLoad = await response.json()
                if (response.ok) {
                    //ده كله اللي راجع اسمو  user
                    return {
                        id: payLoad.user.email,
                        userRes: payLoad.user,
                        tokenRes: payLoad.token

                    }
                } else {
                    throw new Error(payLoad.message)
                }
                return null
            }
        })
    ],
    pages: {
        signIn: "/login",
        error: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.userRes = user.userRes
                token.tokenRes = user.tokenRes
            }
            if (trigger === "update") {
                token.userRes = {
                    ...token.userRes,
                    name: session?.name,
                    email: session?.email,
                }
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.userRes
                session.token = token.tokenRes
            }
            return session
        }
    },

}