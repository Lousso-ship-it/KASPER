import { describe, it, expect, vi, afterEach } from 'vitest';
import { getData } from './dataProviders.js';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('getData', () => {
  it('throws when fetch rejects', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network down'));
    await expect(getData('https://example.com')).rejects.toThrow('Network down');
  });

  it('throws when response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 500 });
    await expect(getData('https://example.com')).rejects.toThrow('Network error: 500');
  });
});
