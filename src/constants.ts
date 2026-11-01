const SECONDS_IN_MINUTE = 60;
const MS_IN_SECOND = 1000;

export const CACHE_CONFIG = {
    TTL_MINUTES: 15,
    get TTL_MS(): number {
        return this.TTL_MINUTES * SECONDS_IN_MINUTE * MS_IN_SECOND;
    },
    PREFIX: 'news_cache_',
} as const;
