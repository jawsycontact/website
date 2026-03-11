import { EventsPageShell } from './_components/events-page-shell';
import { EventsListSkeleton } from './_components/events-list';

export default function LoadingEvents() {
    return (
        <EventsPageShell>
            <EventsListSkeleton />
        </EventsPageShell>
    );
}
