'use client';

import type { ReactNode } from 'react';

type FeedbackStateProps = {
    eyebrow: string;
    title: string;
    description: string;
    digest?: string;
    actions?: ReactNode;
};

export function FeedbackState({ eyebrow, title, description, digest, actions }: FeedbackStateProps) {
    return (
        <section className="container py-12">
            <div className="mx-auto w-full max-w-2xl rounded-2xl border bg-card p-6 sm:p-8">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{eyebrow}</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h1>
                <p className="mt-3 text-sm text-muted-foreground">{description}</p>

                {digest ? (
                    <p className="mt-3 rounded-md border bg-muted/40 px-3 py-2 font-mono text-xs text-muted-foreground">
                        Référence : {digest}
                    </p>
                ) : null}

                {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
            </div>
        </section>
    );
}
