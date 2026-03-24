import { cacheQuery } from '@/lib/cache/server-cache';
import { createClient } from '@/lib/supabase/server-public';
import type { Tables } from '@/lib/supabase/types';
import { EventsPageShell } from './_components/events-page-shell';
import { EventsList } from './_components/events-list';

type Event = Tables<'events'>;

const getEvents = cacheQuery(
    async (): Promise<Event[]> => {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('events')
            .select('id, name, date, longitude, latitude, location_name, description, created_at')
            .order('date', { ascending: true });

        if (error) {
            throw new Error(`Failed to load events: ${error.message}`);
        }

        return data ?? [];
    },
    {
        key: ['events-list'],
        revalidate: 60 * 60,
        tags: ['events'],
    },
);

export default async function Events() {
    let events: Event[] = [];

    try {
        events = await getEvents();
    } catch (error) {
        console.error('Failed to load events for prerender:', error);
    }

    return (
        <EventsPageShell>
            <EventsList events={events} />
        </EventsPageShell>
    );
}
