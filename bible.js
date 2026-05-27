// Netlify function: API.Bible proxy
// Keeps the API.Bible key server-side. Frontend calls /.netlify/functions/bible
exports.handler = async (event) => {
  const key = process.env.BIBLE_API_KEY;
  if (!key) return { statusCode: 500, body: JSON.stringify({ error: 'Bible API key not configured' }) };

  // The sub-path after /v1/ comes in as query param ?path=bibles/ID/chapters/ID
  // All other query params are forwarded to the API
  const params = new URLSearchParams(event.queryStringParameters || {});
  const apiPath = params.get('path') || 'bibles';
  params.delete('path');

  const qs = params.toString();
  const url = `https://rest.api.bible/v1/${apiPath}${qs ? '?' + qs : ''}`;

  try {
    const res = await fetch(url, {
      headers: { 'api-key': key }
    });
    const body = await res.text();
    return {
      statusCode: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body
    };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }
};
