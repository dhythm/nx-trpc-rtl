import { publicProcedure } from '../trpc';
import { t } from '../init';

const getUsers = publicProcedure.query(async (_req) => {
  return [
    { email: 'alice@prisma.io', name: 'Alice' },
    { email: 'bob@prisma.io', name: 'Bob' },
    { email: 'caarol@prisma.io', name: 'Carol' },
    { email: 'dave@prisma.io', name: 'Dave' },
    { email: 'eve@prisma.io', name: 'Eve' },
  ];
});

export const userRouter = t.router({
  getUsers,
});
