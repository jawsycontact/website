'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FeedbackState } from '@/components/feedback-state';

export default function NotFound() {
    return (
        <FeedbackState
            eyebrow="Page introuvable"
            title="Cette page n'existe pas"
            description="La page a peut-être été déplacée ou l'URL est incorrecte."
            actions={
                <Button asChild>
                    <Link href="/">{`Retour à l'accueil`}</Link>
                </Button>
            }
        />
    );
}
