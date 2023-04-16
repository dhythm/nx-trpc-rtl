import { trpc } from '@trpc-client';

export const useUsers = () => {
  const users = trpc.user.getUsers.useQuery();
  return users;
};
