import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/admin');
            const isOnLogin = nextUrl.pathname === '/login';

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isOnLogin) {
                // If user is already logged in and goes to /login, redirect to /admin
                if (isLoggedIn) return Response.redirect(new URL('/admin', nextUrl));
                return true;
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
