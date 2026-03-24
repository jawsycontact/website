import type { Tables } from '@/lib/supabase/types';
import { EventMap } from './event-map';

type Event = Tables<'events'>;

type EventsListProps = {
    events: Event[];
};

function formatCoordinates(latitude: number, longitude: number) {
    return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
}

function formatEventDate(date: string) {
    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(date));
}

export function EventsList({ events }: EventsListProps) {
    if (events.length === 0) {
        return <p className="mt-4 text-sm text-muted-foreground">Aucun événement pour le moment.</p>;
    }

    return (
        <ul className="mt-6 space-y-3">
            {events.map((event) => (
                <li key={event.id} className="rounded-md border p-4">
                    <p className="text-sm font-medium">{event.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        {formatEventDate(event.date)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        {formatCoordinates(event.latitude, event.longitude)}
                    </p>
                    <EventMap longitude={event.longitude} latitude={event.latitude} />
                    {event.location_name ? (
                        <p className="mt-1 text-xs text-muted-foreground">{event.location_name}</p>
                    ) : null}
                    {event.description ? (
                        <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                    ) : null}
                </li>
            ))}
        </ul>
    );
}

type EventsListSkeletonProps = {
    items?: number;
};

export function EventsListSkeleton({ items = 4 }: EventsListSkeletonProps) {
    return (
        <ul className="mt-6 space-y-3">
            {Array.from({ length: items }).map((_, index) => (
                <li key={index} className="rounded-md border p-4">
                    <div className="h-4 w-3/5 animate-pulse rounded bg-muted" />
                    <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted" />
                    <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-muted" />
                </li>
            ))}
        </ul>
    );
}
