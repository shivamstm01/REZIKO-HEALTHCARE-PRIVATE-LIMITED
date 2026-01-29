import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                    <div className="space-y-3 md:flex md:flex-col md:items-start items-center">
                        {/* Logo Section */}
                        <div className="flex justify-center md:justify-start w-full">
                            <h3 className="text-lg font-semibold text-primary">Reziko Healthcare</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mx-auto md:mx-0">
                            Providing premium healthcare solutions for a better tomorrow.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/products" className="hover:text-primary">Products</Link></li>
                            <li><Link href="/career" className="hover:text-primary">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Contact</h4>
                        <p className="text-sm text-muted-foreground">
                            info@reziko.com<br />
                            +1 (555) 123-4567
                        </p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Reziko Healthcare. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
