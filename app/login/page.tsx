'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-sm space-y-6 border p-6 rounded shadow">
                <h1 className="text-2xl font-bold text-center">Admin Login</h1>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required placeholder="admin@reziko.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    <div aria-live="polite" aria-atomic="true">
                        {errorMessage && (
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        )}
                    </div>
                    <Button className="w-full" aria-disabled={isPending}>
                        {isPending ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
