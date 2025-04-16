import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// Define an array of protected routes

const protectedRoutes = [
  "/",
  "/dashboard",
];

// Helper function to check if a path is protected
function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => path.startsWith(route));
}
 
export function middleware(request: NextRequest) {
  // Middleware logic goes here
  const currentPath = request.nextUrl.pathname;
  let token = request.cookies.get('accessToken')?.value // retrieve the token
  
  if (isProtectedRoute(currentPath) && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  // if (currentPath == '/auth/login') return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();

}


// Optionally, you can add a matcher to optimize performance
export const config = {
  matcher: [
    "/((?!api|auth|_next/static|_next/image|favicon.ico).*)",
  ]
}

