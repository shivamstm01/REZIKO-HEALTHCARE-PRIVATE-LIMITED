import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-tight text-primary">Reziko Healthcare</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6 items-center">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                        Home
                    </Link>
                    <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                        About Us
                    </Link>
                    <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary">
                        Our Products
                    </Link>
                    <Link href="/career" className="text-sm font-medium transition-colors hover:text-primary">
                        Career
                    </Link>
                    <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                        Contact Us
                    </Link>
                </nav>

                <div className="flex items-center gap-2">
                    <ModeToggle />

                    <div className="hidden md:block">
                        <Button variant="outline" asChild>
                            <Link href="/login">Admin Login</Link>
                        </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetTitle className="mb-4">Menu</SheetTitle>
                            <nav className="flex flex-col gap-4">
                                <Link href="/" className="text-lg font-medium hover:underline">
                                    Home
                                </Link>
                                <Link href="/products" className="text-lg font-medium hover:underline">
                                    Products
                                </Link>
                                <Link href="/about" className="text-lg font-medium hover:underline">
                                    About Us
                                </Link>
                                <Link href="/career" className="text-lg font-medium hover:underline">
                                    Career
                                </Link>
                                <Link href="/contact" className="text-lg font-medium hover:underline">
                                    Contact
                                </Link>
                                <div className="mt-4">
                                    <Button className="w-full" asChild>
                                        <Link href="/login">Admin Login</Link>
                                    </Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
