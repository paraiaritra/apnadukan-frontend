const API_URL = 'http://localhost:5000/api';

export const apiFetch = async (url, options = {}) => {
  const res = await fetch(`${API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'API Error');
  }

  return res.json();
};
