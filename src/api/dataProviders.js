const DEFAULT_TIMEOUT = 5000;

// Helper function to perform fetch with timeout and fallback to cache
export async function fetchWithTimeout(url, { timeout = DEFAULT_TIMEOUT, cacheKey, ...options } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (cacheKey) {
      try {
        localStorage.setItem(cacheKey, JSON.stringify(data));
      } catch (_) {
        // ignore storage errors
      }
    }
    return { data };
  } catch (error) {
    clearTimeout(id);
    let fallback;
    if (cacheKey) {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          fallback = JSON.parse(cached);
        }
      } catch (_) {
        // ignore storage errors
      }
    }
    return fallback ? { data: fallback, error } : { error };
  }
}

// Example provider: fetch world countries GeoJSON
export function getCountriesGeoJSON() {
  return fetchWithTimeout(
    'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson',
    { cacheKey: 'countriesGeoJSON' }
  );
}
