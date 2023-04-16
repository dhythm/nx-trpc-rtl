import { trpcServer } from './trpc-server';

describe('trpcServer', () => {
  it('should work', () => {
    expect(trpcServer()).toEqual('trpc-server');
  });
});
