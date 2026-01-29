"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    LayoutDashboard,
    ShoppingBag,
    Briefcase,
    FileText,
    LogOut,
    Menu,
    ChevronLeft,
    ChevronRight,
    Settings
} from "lucide-react";
import { signOut } from "next-auth/react";
import { ModeToggle } from "@/components/mode-toggle";

interface SidebarProps {
    className?: string;
}

export function AdminSidebar({ className }: SidebarProps) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/admin",
            active: pathname === "/admin",
        },
        {
            label: "Products",
            icon: ShoppingBag,
            href: "/admin/products",
            active: pathname?.startsWith("/admin/products"),
        },
        {
            label: "Jobs",
            icon: Briefcase,
            href: "/admin/jobs",
            active: pathname?.startsWith("/admin/jobs"),
        },
        {
            label: "Applications",
            icon: FileText,
            href: "/admin/applications",
            active: pathname?.startsWith("/admin/applications"),
        },
    ];

    const handleSignOut = () => {
        signOut({ callbackUrl: "/login" });
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden md:flex flex-col border-r bg-slate-100 dark:bg-slate-900 transition-all duration-300",
                    isCollapsed ? "w-16" : "w-64",
                    className
                )}
            >
                {/* Header / Toggle */}
                <div className="flex items-center justify-between p-4 h-16 border-b">
                    {!isCollapsed && (
                        <h2 className="text-xl font-bold text-primary truncate">Admin Panel</h2>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={cn("ml-auto", isCollapsed ? "mx-auto" : "")}
                    >
                        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 px-2 space-y-2">
                    {routes.map((route) => (
                        <Button
                            key={route.href}
                            variant={route.active ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start",
                                isCollapsed ? "justify-center px-2" : "px-4"
                            )}
                            asChild
                        >
                            <Link href={route.href} title={isCollapsed ? route.label : undefined}>
                                <route.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")} />
                                {!isCollapsed && <span>{route.label}</span>}
                            </Link>
                        </Button>
                    ))}
                </nav>

                {/* Footer / Sign Out */}
                <div className="p-4 border-t space-y-4">
                    {!isCollapsed && (
                        <div className="flex items-center justify-between px-2 animate-in fade-in">
                            <span className="text-sm font-medium">Theme</span>
                            <ModeToggle />
                        </div>
                    )}
                    {isCollapsed && (
                        <div className="flex justify-center mb-2">
                            <ModeToggle />
                        </div>
                    )}
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full",
                            isCollapsed ? "justify-center px-2" : "justify-start"
                        )}
                        onClick={handleSignOut}
                        title="Sign Out"
                    >
                        <LogOut className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")} />
                        {!isCollapsed && <span>Sign Out</span>}
                    </Button>
                </div>
            </aside>

            {/* Mobile Sidebar (Sheet) */}
            <div className="md:hidden flex items-center p-4 border-b bg-background">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0">
                        <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
                            </div>
                            <nav className="flex-1 p-4 space-y-2">
                                {routes.map((route) => (
                                    <Button
                                        key={route.href}
                                        variant={route.active ? "secondary" : "ghost"}
                                        className="w-full justify-start"
                                        asChild
                                    >
                                        <Link href={route.href}>
                                            <route.icon className="h-5 w-5 mr-3" />
                                            {route.label}
                                        </Link>
                                    </Button>
                                ))}
                            </nav>
                            <div className="p-4 border-t space-y-2">
                                <div className="flex items-center justify-between px-2">
                                    <span className="text-sm font-medium">Theme</span>
                                    <ModeToggle />
                                </div>
                                <Button variant="outline" className="w-full justify-start" onClick={handleSignOut}>
                                    <LogOut className="h-5 w-5 mr-3" />
                                    Sign Out
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                <h1 className="ml-4 font-semibold text-lg">Admin Dashboard</h1>
            </div>
        </>
    );
}
