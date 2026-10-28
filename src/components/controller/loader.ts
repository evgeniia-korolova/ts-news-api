import { RequestArgs } from 'types/types';

class Loader {
    // options apiKey
    constructor(
        protected readonly baseLink: string,
        protected readonly options: Record<string, string>
    ) {
        if (!baseLink.trim()) {
            throw new Error('Loader Error: Base link URL cannot be empty');
        }
        if (!options.apiKey || !options.apiKey.trim()) {
            throw new Error('Loader Error: API key is missing or empty');
        }
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: RequestArgs,
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, string>, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        const params = new URLSearchParams(urlOptions);
        const url = `${this.baseLink}/${endpoint}?${params}`;
        return url;
    }

    load<T>(method: 'GET', endpoint: string, callback: (data: T) => void, options: Record<string, string> = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res): Promise<T> => res.json())
            .then((data) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
