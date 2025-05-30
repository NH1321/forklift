export async function callApi(endpoint, { method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(`http://localhost:5000${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include', 
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}
