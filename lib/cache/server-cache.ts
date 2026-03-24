import { unstable_cache } from 'next/cache';

type CacheKey = string | string[];

type CacheOptions = {
    key: CacheKey;
    revalidate?: number | false;
    tags?: string[];
};

export function cacheQuery<T>(loader: () => Promise<T>, options: CacheOptions) {
    const keyParts = Array.isArray(options.key) ? options.key : [options.key];

    return unstable_cache(loader, keyParts, {
        revalidate: options.revalidate,
        tags: options.tags,
    });
}
