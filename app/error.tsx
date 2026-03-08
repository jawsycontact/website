'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

type AppErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function AppError({ error, reset }: AppErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section className="container py-12">
            <div className="mx-auto w-full max-w-2xl rounded-2xl border bg-card p-6 sm:p-8">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Application Error</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">Something went wrong</h1>
                <p className="mt-3 text-sm text-muted-foreground">
                    The page could not be loaded. Try again, then check server logs if this keeps happening.
                </p>

                {error.digest ? (
                    <p className="mt-3 rounded-md border bg-muted/40 px-3 py-2 font-mono text-xs text-muted-foreground">
                        Digest: {error.digest}
                    </p>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                    <Button onClick={reset}>Try again</Button>
                    <Button asChild variant="outline">
                        <Link href="/">Go to home</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
