import { NewsResponse, SourcesResponse } from 'types/types';

export function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

export function isNewsResponse(res: unknown): res is NewsResponse {
    if (!isObject(res) || res.status !== 'ok') {
        return false;
    }

    return Array.isArray(res.articles);
}

export function isSourcesResponse(res: unknown): res is SourcesResponse {
    if (!isObject(res) || res.status !== 'ok') {
        return false;
    }

    return Array.isArray(res.sources);
}
