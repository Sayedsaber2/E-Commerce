import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

const productRoutes = ["/profile", "/cart", "/wishlist","/orders"] 
const AuthRoutes = ["/login", "/forgotpassword", "/signup"]

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req })
    if (productRoutes.includes(req.nextUrl.pathname)) {
        if (token) {
            return NextResponse.next()
        } else {
            const redirectURL = new URL("/login", process.env.NEXTAUTH_URL)
            redirectURL.searchParams.set("url", req.nextUrl.pathname)
            return NextResponse.redirect(redirectURL)
        }
    }
    if (AuthRoutes.includes(req.nextUrl.pathname)) {
        if (token) {
            const redirectURL = new URL("/", process.env.NEXTAUTH_URL)
            return NextResponse.redirect(redirectURL)
        } else {
            return NextResponse.next()
        }
    }
    return NextResponse.next()

}
