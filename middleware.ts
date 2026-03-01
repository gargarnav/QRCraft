import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    '/',
    '/auth/login(.*)',
    '/auth/signup(.*)',
    '/pricing(.*)',
    '/api/webhooks/(.*)'
]);

const isAuthRoute = createRouteMatcher([
    '/auth/login(.*)',
    '/auth/signup(.*)'
]);

export default clerkMiddleware(async (auth, request) => {
    const authObj = await auth();

    // Redirect authenticated users away from the auth pages
    if (authObj.userId && isAuthRoute(request)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Protect all non-public routes
    if (!isPublicRoute(request)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
