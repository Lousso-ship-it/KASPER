import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout.jsx';
import { createPageUrl } from '@/utils';

vi.mock('../components/common/AnimatedBackground', () => ({
  default: () => <div data-testid="animated" />,
}));

vi.mock('../components/common/GlobalSearch', () => ({
  default: () => <div data-testid="search" />,
}));

describe('Layout', () => {
  it('marks current navigation item active based on route', () => {
    render(
      <MemoryRouter initialEntries={[createPageUrl('Terminal')]}>
        <Layout>
          <div />
        </Layout>
      </MemoryRouter>
    );

    const terminalLink = screen.getByRole('link', { name: 'TERMINAL' });
    expect(terminalLink).toHaveAttribute('aria-current', 'page');
  });
});

