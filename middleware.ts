// if you want to authenticate and redirect if not logged in
// import { getToken } from 'next-auth/jwt';
// import { withAuth } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';
export { default } from 'next-auth/middleware';

// export default withAuth(async function middleware(req) {
// 	const token = await getToken({ req });
// 	// if token exists, !!token will be true
// 	const isAuthenticated = !!token;

// 	// first, check if the current path is login page
// 	if (
// 		req.nextUrl.pathname.startsWith('/sign-in') ||
// 		req.nextUrl.pathname.startsWith('/sign-up')
// 	) {
// 		// I am in "login" page now  I check if the user is authenticated or not
// 		if (isAuthenticated) {
// 			// If I get here it means user is on "login" page and it is authenticated. then redirect it to whatever url
// 			return NextResponse.redirect(new URL('/admin', req.url));
// 		}
// 	}
// });

export const config = {
	matcher: ['/admin', '/app/:path']
};
