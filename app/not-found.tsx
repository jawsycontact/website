'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FeedbackState } from '@/components/feedback-state';

export default function NotFound() {
    return (
        <FeedbackState
            eyebrow="Not Found"
            title="This page does not exist"
            description="The page may have moved or the URL might be incorrect."
            actions={
                <Button asChild>
                    <Link href="/">Go to home</Link>
                </Button>
            }
        />
    );
}
