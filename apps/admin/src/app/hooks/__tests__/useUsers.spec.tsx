import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { FC, PropsWithChildren, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient as initialTrpcClient } from '@trpc-client';
import { useUsers } from '../useUsers';
import { renderHook, waitFor } from '@testing-library/react';

test('successfully run with mock response', async () => {
  const server = setupServer();
  server.use(
    rest.get('*/trpc/user.getUsers', (_, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    })
  );
  server.listen();

  const queryClient = useMemo(() => new QueryClient(), []);
  const trpcClient = useMemo(() => initialTrpcClient, []);

  const wrapper: FC<PropsWithChildren<unknown>> = ({ children }) => (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );

  const { result } = renderHook(
    () => {
      const users = useUsers();
      return users;
    },
    { wrapper }
  );

  await waitFor(() => {
    expect(result.current).toEqual({});
  });
});
