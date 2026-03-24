import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/types';

let client: ReturnType<typeof createSupabaseClient<Database>> | null = null;

export function createClient() {
    if (client) {
        return client;
    }

    client = createSupabaseClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    );

    return client;
}
