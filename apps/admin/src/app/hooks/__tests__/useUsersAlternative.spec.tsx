import { rest } from 'msw';
import { useUsers } from '../useUsersAltenative';
import { renderHook, waitFor } from '@testing-library/react';
import { setupMockServer, Wrapper } from '@test';

const server = setupMockServer();

test('successfully run with mock response', async () => {
  server.use(
    rest.get('*/trpc/user.getUsers', (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([{ email: 'alice@prisma.io', name: 'Alice' }])
      );
    })
  );

  const { result } = renderHook(
    () => {
      const users = useUsers();
      return users;
    },
    { wrapper: Wrapper }
  );

  expect(result.current.isLoading).toBe(true);
  await waitFor(() => expect(result.current.data).not.toBe(undefined));
  expect(result.current.isLoading).toBe(false);
  expect(result.current.data).toEqual(
    expect.arrayContaining([{ email: 'alice@prisma.io', name: 'Alice' }])
  );
});
