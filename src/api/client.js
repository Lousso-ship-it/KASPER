const API_BASE = import.meta.env.VITE_API_BASE || '/api';

async function request(path, options = {}) {
  const { body, headers, ...rest } = options;
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined,
    ...rest
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  if (response.status === 204) return null;
  return response.json();
}

export function createEntity(resource) {
  return {
    list: () => request(`/${resource}`),
    get: (id) => request(`/${resource}/${id}`),
    create: (data) => request(`/${resource}`, { method: 'POST', body: data }),
    update: (id, data) => request(`/${resource}/${id}`, { method: 'PUT', body: data }),
    delete: (id) => request(`/${resource}/${id}`, { method: 'DELETE' })
  };
}

export function callEndpoint(path, data) {
  return request(`/${path}`, { method: 'POST', body: data });
}

export default { createEntity, callEndpoint };
