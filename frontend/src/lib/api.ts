const API_BASE = 'http://localhost:3001/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

async function fetchApi(url: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${url}`, { ...options, headers });
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

export const api = {
  login: (username: string, password: string) =>
    fetchApi('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  register: (username: string, password: string, fullName: string) =>
    fetchApi('/auth/register', { method: 'POST', body: JSON.stringify({ username, password, fullName }) }),
  getProfile: () => fetchApi('/auth/profile'),
  getDashboard: (page: string, filters?: Record<string, string>) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([k, v]) => {
        if (v && v !== 'Tất cả') params.append(k, v);
      });
    }
    const qs = params.toString();
    return fetchApi(`/dashboard/${page}${qs ? `?${qs}` : ''}`);
  },
  // Plant CRUD
  getPlants: () => fetchApi('/plants'),
  getPlant: (id: string) => fetchApi(`/plants/${id}`),
  createPlant: (data: any) => fetchApi('/plants', { method: 'POST', body: JSON.stringify(data) }),
  updatePlant: (id: string, data: any) => fetchApi(`/plants/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePlant: (id: string) => fetchApi(`/plants/${id}`, { method: 'DELETE' }),
  // HR Management CRUD
  getEmployees: () => fetchApi('/hr-management'),
  getEmployee: (id: string) => fetchApi(`/hr-management/${id}`),
  createEmployee: (data: any) => fetchApi('/hr-management', { method: 'POST', body: JSON.stringify(data) }),
  updateEmployee: (id: string, data: any) => fetchApi(`/hr-management/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteEmployee: (id: string) => fetchApi(`/hr-management/${id}`, { method: 'DELETE' }),
};

