interface NetlifyEvent {
    queryStringParameters: Record<string, string | undefined>;
}

interface NetlifyResponse {
    statusCode: number;
    headers?: Record<string, string>;
    body: string;
}

export const handler = async (event: NetlifyEvent): Promise<NetlifyResponse> => {
    try {
        const params = event.queryStringParameters || {};

        const endpoint = params.endpoint;

        if (!endpoint) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing "endpoint" parameter' }),
            };
        }

        const apiParams = { ...params };
        delete apiParams.endpoint;

        delete apiParams.apiKey;

        const searchParams = new URLSearchParams(apiParams as Record<string, string>).toString();
        const apiKey = process.env.API_KEY;

        if (!apiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Server configuration error: API_KEY is missing' }),
            };
        }

        const targetUrl = `https://onrender.com{endpoint}?apiKey=${apiKey}${searchParams ? `&${searchParams}` : ''}`;

        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Netlify-News-Proxy-App',
            },
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: await response.text(),
            };
        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error instanceof Error ? error.message : 'Internal Server Error' }),
        };
    }
};
