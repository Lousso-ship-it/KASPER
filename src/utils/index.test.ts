import { describe, it, expect } from 'vitest';
import { createPageUrl } from './index';

describe('createPageUrl', () => {
  it('creates a slugged URL from page name', () => {
    expect(createPageUrl('My Page')).toBe('/my-page');
  });
});

