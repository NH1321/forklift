export async function fetchWithAuth(url, options = {}) {
  let accessToken = localStorage.getItem('accessToken');
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': options.headers?.['Content-Type'] || 'application/json',
  };
  const opts = { ...options, headers, credentials: 'include' };

  let res = await fetch(url, opts);

  // Nếu accessToken hết hạn, thử refresh
  if (res.status === 401) {
    const refreshRes = await fetch('http://localhost:5000/api/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });
    const refreshData = await refreshRes.json();
    if (refreshRes.ok && refreshData.accessToken) {
      localStorage.setItem('accessToken', refreshData.accessToken);
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${refreshData.accessToken}`,
      };
      const retryOpts = { ...opts, headers: retryHeaders };
      res = await fetch(url, retryOpts);
    } else {
      throw refreshData;
    }
  }

  return res;
}
