import type { ReactNode } from 'react';

type EventsPageShellProps = {
    children: ReactNode;
};

export function EventsPageShell({ children }: EventsPageShellProps) {
    return (
        <main className="mx-auto w-full max-w-2xl px-6 py-8">
            <h1 className="text-2xl font-semibold tracking-tight">Events</h1>
            {children}
        </main>
    );
}
