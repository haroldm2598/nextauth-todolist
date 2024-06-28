// // if you want to authenticate and redirect if not logged in
// https://stackoverflow.com/questions/76175812/prevent-authenticated-users-to-access-custom-sign-in-page-with-next-auth-middlew
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(
	req: NextRequest,
	event: NextFetchEvent
) {
	const token = await getToken({ req });
	const isAuthenticated = !!token;

	// error finding sira naman yung button ng sign-up nag redirect sa sign in lagi
	if (req.nextUrl.pathname.startsWith('/sign-in') && isAuthenticated) {
		return NextResponse.redirect(new URL('/admin', req.url));
	}

	if (req.nextUrl.pathname.startsWith('/sign-up') && isAuthenticated) {
		return NextResponse.redirect(new URL('/admin', req.url));
	}

	if (
		req.nextUrl.pathname.startsWith('/') ||
		req.nextUrl.pathname.startsWith('/sign-in') ||
		req.nextUrl.pathname.startsWith('/sign-up')
	) {
		return fetch(req);
	}

	const authMiddleware = await withAuth({
		pages: {
			signIn: `/sign-in`
		}
	});

	// @ts-expect-error
	return authMiddleware(req, event);
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};

// export { default } from 'next-auth/middleware';
// export const config = {
// 	matcher: ['/admin', '/app/:path']
// };
