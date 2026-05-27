// Netlify function: ESV API proxy
// Keeps the ESV key server-side. Frontend calls /.netlify/functions/esv
exports.handler = async (event) => {
  const key = process.env.ESV_API_KEY;
  if (!key) return { statusCode: 500, body: JSON.stringify({ error: 'ESV key not configured' }) };

  // Build the ESV API URL from the incoming path + query params
  // event.path will be /.netlify/functions/esv
  // We pass the sub-path as ?endpoint=passage/text or ?endpoint=passage/search
  const params = new URLSearchParams(event.queryStringParameters || {});
  const endpoint = params.get('endpoint') || 'passage/text';
  params.delete('endpoint');

  const url = `https://api.esv.org/v3/${endpoint}/?${params.toString()}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Token ${key}` }
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
