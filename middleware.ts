import axios from "axios"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define the routes that require authentication and subscription
const protectedRoutes = ["/dashboard"]
const plansPage = "/plans" // Page where users can select a subscription

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const { pathname } = url

  // Check if the request path matches any of the protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const sessionCookie = req.cookies.get("connect.sid")?.value // Passport session cookie

    // If no session cookie is found, redirect to the login page
    if (!sessionCookie) {
      url.pathname = "/auth/login" // Redirect to login page
      return NextResponse.redirect(url)
    }

    try {
      // Make a request to your backend to check if the user is authenticated
      const response = await axios.get(`https://indieseo.onrender.com/user`, {
        withCredentials: true,
        headers: {
          Cookie: `connect.sid=${sessionCookie}`,
        },
      })

      if (response.status !== 200) {
        url.pathname = "/auth/login"
        return NextResponse.redirect(url)
      }

      const user = response.data.user

      console.log(user)

      if (!user) {
        url.pathname = "/auth/login"
        return NextResponse.redirect(url)
      }

      // Check if the user is subscribed
      if (!user.subscribed) {
        url.pathname = plansPage // Redirect to the plans page if not subscribed
        return NextResponse.redirect(url)
      }
    } catch (error) {
      console.log(error)
      url.pathname = "/auth/login"
      return NextResponse.redirect(url)
    }
  }

  // If authenticated and subscribed or not a protected route, continue as normal
  return NextResponse.next()
}

// Apply the middleware to specific paths
export const config = {
  matcher: ["/dashboard/:path*"], // Protect all /dashboard/* paths
}
