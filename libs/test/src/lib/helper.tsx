import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode, useState } from 'react';
import { trpc, trpcClient } from '@trpc-client';
import type { RequestHandler } from 'msw';
import { render as originalRender } from '@testing-library/react';
import { setupServer } from 'msw/node';
import type { ReactElement } from 'react';

export function Wrapper({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

export function setupMockServer(...handlers: RequestHandler[]) {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
}

export function render(ui: ReactElement) {
  return originalRender(<Wrapper>{ui}</Wrapper>);
}
