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
            eyebrow="Erreur de l'application"
            title="Une erreur est survenue"
            description="La page n'a pas pu être chargée. Réessayez, puis vérifiez les logs serveur si le problème persiste."
            digest={error.digest}
            actions={
                <>
                    <Button onClick={reset}>Réessayer</Button>
                    <Button asChild variant="outline">
                        <Link href="/">{`Retour à l'accueil`}</Link>
                    </Button>
                </>
            }
        />
    );
}
