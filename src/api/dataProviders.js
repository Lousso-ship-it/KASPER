const CACHE_PREFIX = 'dataProvider:';

/**
 * Fetch JSON data with timeout and localStorage fallback.
 * @param {string} url - Resource to fetch.
 * @param {Object} [options] - Options.
 * @param {Object} [options.fetchOptions] - Options passed to fetch.
 * @param {number} [options.timeout=5000] - Timeout in ms.
 * @param {string} [options.cacheKey] - Key used to cache the response.
 * @returns {Promise<{data?: any, error?: string, fallback?: boolean}>}
 */
export async function fetchWithFallback(url, { fetchOptions = {}, timeout = 5000, cacheKey } = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...fetchOptions, signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(response.statusText || `Request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (cacheKey) {
      try {
        localStorage.setItem(CACHE_PREFIX + cacheKey, JSON.stringify(data));
      } catch {
        // Ignore caching errors
      }
    }

    return { data };
  } catch (error) {
    clearTimeout(timeoutId);

    let cachedData;
    if (cacheKey) {
      try {
        const cached = localStorage.getItem(CACHE_PREFIX + cacheKey);
        if (cached) {
          cachedData = JSON.parse(cached);
        }
      } catch {
        // Ignore cache parsing errors
      }
    }

    if (cachedData !== undefined) {
      return { data: cachedData, error: error.message, fallback: true };
    }

    return { error: error.message };
  }
}

export default { fetchWithFallback };
