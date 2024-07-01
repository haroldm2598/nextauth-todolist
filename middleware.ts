// // if you want to authenticate and redirect if not logged in
// https://stackoverflow.com/questions/76175812/prevent-authenticated-users-to-access-custom-sign-in-page-with-next-auth-middlew
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';


export default async function middleware(req: NextRequest, event:NextFetchEvent) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    // if the user is already authenticated and tries to access one of the auth pages
    // redirect to the home page
    if (
        (req.nextUrl.pathname.startsWith("/sign-in") ||
            req.nextUrl.pathname.startsWith("/sign-up")) &&
        isAuthenticated
    ) {
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    // if the user is not authenticated, allow them to visit the auth pages
    if (
        req.nextUrl.pathname.startsWith("/sign-in") ||
        req.nextUrl.pathname.startsWith("/sign-up")
    ) {
        return fetch(req);
    }

    // if the user is not authenticated and tries to access any other page
    // redirect to the login page
    const authMiddleware = withAuth({
        pages: {
            signIn: `/sign-in`
        }
    });
	
	// @ts-expect-error
    return authMiddleware(req, event);
}

// config to match all pages
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};


// export { default } from 'next-auth/middleware';
// export const config = {
// 	matcher: ['/admin', '/app/:path']
// };
