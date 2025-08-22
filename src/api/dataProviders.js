const CACHE_PREFIX = 'dataProvider:';

/**
 * Fetch JSON data with timeout and localStorage fallback.
 * Wraps the native `fetch` in a try/catch block and returns structured
 * error information when a request fails. Successful responses are cached
 * in `localStorage` and served as a fallback on subsequent failures.
 *
 * @param {string} url - Resource to fetch.
 * @param {Object} [options] - Options.
 * @param {Object} [options.fetchOptions] - Options passed to fetch.
 * @param {number} [options.timeout=5000] - Timeout in ms.
 * @param {string} [options.cacheKey] - Key used to cache the response. Defaults to the URL.
 * @returns {Promise<{data?: any, error?: {message: string}, fallback?: boolean}>}
 */
export default async function fetchWithFallback(
  url,
  { fetchOptions = {}, timeout = 5000, cacheKey = url } = {},
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        response.statusText || `Request failed with status ${response.status}`,
      );
    }

    const data = await response.json();

    if (typeof localStorage !== 'undefined') {
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
    if (typeof localStorage !== 'undefined') {
      try {
        const cached = localStorage.getItem(CACHE_PREFIX + cacheKey);
        if (cached) {
          cachedData = JSON.parse(cached);
        }
      } catch {
        // Ignore cache parsing errors
      }
    }

    const errMessage =
      error && typeof error === 'object' && 'name' in error && error.name === 'AbortError'
        ? 'Request timed out'
        : error instanceof Error
          ? error.message
          : String(error);

    if (cachedData !== undefined) {
      return { data: cachedData, error: { message: errMessage }, fallback: true };
    }

    return { error: { message: errMessage } };
  }
}
