"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Hide Header only on admin routes
    const shouldHideHeader = pathname?.startsWith("/admin");

    // Hide Footer on admin routes AND login page
    const shouldHideFooter = pathname?.startsWith("/admin") || pathname === "/login";

    return (
        <div className="relative flex min-h-screen flex-col">
            {!shouldHideHeader && <Header />}
            <main className="flex-1">
                {children}
            </main>
            {!shouldHideFooter && <Footer />}
        </div>
    );
}
