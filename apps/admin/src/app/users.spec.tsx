import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { trpc, trpcClient } from '@trpc-client';
import { Users } from './users';

test('Can display user list', async () => {
  const queryClient = new QueryClient();
  render(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Users />
      </QueryClientProvider>
    </trpc.Provider>
  );
  expect(await screen.findByText('Alice')).toBeInTheDocument();
});
