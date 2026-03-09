import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';
import type { Tables } from '@/lib/supabase/types';
import { EventsPageShell } from './_components/events-page-shell';
import { EventsList } from './_components/events-list';

type Event = Tables<'events'>;

const getEvents = cache(async (): Promise<Event[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('events')
        .select('id, name, date, longitude, latitude, location_name, description, created_at')
        .order('date', { ascending: true });

    if (error) {
        throw new Error(`Failed to load events: ${error.message}`);
    }

    return data ?? [];
});

export default async function Events() {
    const events = await getEvents();

    return (
        <EventsPageShell>
            <EventsList events={events} />
        </EventsPageShell>
    );
}
