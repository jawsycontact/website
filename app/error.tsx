'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FeedbackState } from '@/components/feedback-state';

type AppErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function AppError({ error, reset }: AppErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <FeedbackState
            eyebrow="Application Error"
            title="Something went wrong"
            description="The page could not be loaded. Try again, then check server logs if this keeps happening."
            digest={error.digest}
            actions={
                <>
                    <Button onClick={reset}>Try again</Button>
                    <Button asChild variant="outline">
                        <Link href="/">Go to home</Link>
                    </Button>
                </>
            }
        />
    );
}
