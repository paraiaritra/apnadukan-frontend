const API_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (url, options = {}) => {
  const res = await fetch(`${API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',   // ⭐ VERY IMPORTANT (cookies/auth)
    ...options,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'API Error');
  }

  return res.json();
};