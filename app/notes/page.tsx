import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';
import type { Tables } from '@/lib/supabase/types';

type Note = Tables<'notes'>;

const getNotes = cache(async (): Promise<Note[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('notes')
        .select('id, title')
        .order('id', { ascending: false });

    if (error) {
        throw new Error(`Failed to load notes: ${error.message}`);
    }

    return data;
});

export default async function Notes() {
    const notes = await getNotes();

    return (
        <main className="mx-auto w-full max-w-2xl px-6 py-8">
            <h1 className="text-2xl font-semibold tracking-tight">Notes</h1>

            {notes.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">No notes yet.</p>
            ) : (
                <ul className="mt-6 space-y-3">
                    {notes.map((note) => (
                        <li key={note.id} className="rounded-md border p-4">
                            <p className="text-sm">{note.title}</p>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
