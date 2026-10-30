import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const isProduction = process.env.NODE_ENV === 'production';

        // const proxyUrl = 'https://rss-news-api.onrender.com';
        const proxyUrl = '/.netlify/functions/news-proxy';

        const baseLink = isProduction ? proxyUrl : process.env.API_URL ?? '';
        const apiKey = isProduction ? 'proxy' : process.env.API_KEY ?? '';

        super(baseLink, { apiKey });
    }

    override makeUrl(options: Record<string, string>, endpoint: string): string {
        const isProduction = process.env.NODE_ENV === 'production';

        if (isProduction) {
            // const proxyEndpoint = `mocks/${endpoint}`;

            // const params = new URLSearchParams(options).toString();

            // return `${this.baseLink}/${proxyEndpoint}${params ? `?${params}` : ''}`;
            const urlOptions = { ...options, ...this.options, endpoint };
            const params = new URLSearchParams(urlOptions);

            return `${this.baseLink}?${params.toString()}`;
        }

        return super.makeUrl(options, endpoint);
    }
}

export default AppLoader;
