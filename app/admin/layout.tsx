import { auth } from '@/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session?.user) {
        // Config usually handles this but double check
        redirect("/admin/login");
    }

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <aside className="w-full md:w-64 bg-slate-100 dark:bg-slate-900 border-r p-6">
                <h2 className="text-xl font-bold mb-8 text-primary">Admin Panel</h2>
                <nav className="flex flex-col space-y-2">
                    <Button variant="ghost" asChild className="justify-start">
                        <Link href="/admin">Dashboard</Link>
                    </Button>
                    <Button variant="ghost" asChild className="justify-start">
                        <Link href="/admin/products">Products</Link>
                    </Button>
                    <Button variant="ghost" asChild className="justify-start">
                        <Link href="/admin/jobs">Jobs</Link>
                    </Button>
                    <Button variant="ghost" asChild className="justify-start">
                        <Link href="/admin/applications">Applications</Link>
                    </Button>
                    <div className="pt-4 mt-4 border-t">
                        <form action={async () => {
                            'use server';
                            const { signOut } = await import('@/auth');
                            await signOut();
                        }}>
                            <Button variant="secondary" className="w-full justify-start">Sign Out</Button>
                        </form>
                    </div>
                </nav>
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
