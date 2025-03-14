import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('new-token');
    const path = request.nextUrl.pathname;

    // Public routes that don't require authentication
    const publicRoutes = ['/login'];

    // Routes that require authentication
    const protectedRoutes = [
        '/',
        '/products',
        '/products/add',
        '/products/edit',
        '/orders',
        '/customers',
        '/settings'
    ];

    // Check if the current path requires authentication
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isPublicRoute = publicRoutes.some(route => path === route);

    // Allow Sanity Studio routes to bypass auth (they have their own auth)
    if (path.startsWith('/studio')) {
        return NextResponse.next();
    }

    // If user is not authenticated and trying to access a protected route
    if (!token && isProtectedRoute) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', path);
        return NextResponse.redirect(loginUrl);
    }

    // If user is authenticated and trying to access login
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/products/:path*',
        '/orders/:path*',
        '/customers/:path*',
        '/settings/:path*'
    ],
};