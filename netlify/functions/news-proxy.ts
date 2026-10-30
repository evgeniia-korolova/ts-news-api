export default async (request: Request) => {
  const url = new URL(request.url);  
  
  const originalPath = request.headers.get('x-nf-original-path') || url.pathname;  
  
  const endpoint = originalPath.replace(/^\/api\//, '');
  
  const searchParams = url.searchParams.toString();  
  
  const apiKey = process.env['API_KEY'];

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Server Configuration Error: API_KEY is missing' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const newsApiUrl = `https://newsapi.org${endpoint}?${searchParams ? `${searchParams}` : ''}`;
  
  // Формат: https://onrender.com...
  //const newsApiUrl = `https://onrender.com{endpoint}?apiKey=${apiKey}${searchParams ? `&${searchParams}` : ''}`;

  try {
    const response = await fetch(newsApiUrl, {
      headers: {
        'X-Api-Key': apiKey,
        'User-Agent': 'Netlify-News-Proxy-App'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(errorText, {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('News Proxy API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data from News Proxy' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = {
  path: '/api/*',
};