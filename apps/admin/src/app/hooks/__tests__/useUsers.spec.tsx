import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from '@trpc-client';
import { useUsers } from '../useUsers';
import { renderHook, waitFor } from '@testing-library/react';

const server = setupServer();

test('successfully run with mock response', async () => {
  // beforeAll(() => server.listen());
  // afterAll(() => server.close());
  // afterEach(() => server.resetHandlers());

  server.use(
    rest.get('*/trpc/user.getUsers', (_, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    })
  );
  server.listen();

  const queryClient = new QueryClient();

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

  expect(result.current.isLoading).toBe(true);
  await waitFor(() => expect(result.current.data).toEqual([]));
  expect(result.current.isLoading).toBe(false);
});
