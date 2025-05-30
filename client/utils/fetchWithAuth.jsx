export async function fetchWithAuth(url, options = {}) {
  let accessToken = localStorage.getItem('accessToken');
  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': options.headers?.['Content-Type'] || 'application/json',
  };
  options.credentials = 'include';

  let res = await fetch(url, options);

  // Nếu accessToken hết hạn, thử refresh
  if (res.status === 401) {
    // Gọi refresh token
    const refreshRes = await fetch('http://localhost:5000/api/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });
    const refreshData = await refreshRes.json();
    if (refreshRes.ok && refreshData.accessToken) {
      // Lưu accessToken mới
      localStorage.setItem('accessToken', refreshData.accessToken);
      // Gửi lại request gốc với token mới
      options.headers.Authorization = `Bearer ${refreshData.accessToken}`;
      res = await fetch(url, options);
    }
  }

  return res;
}
