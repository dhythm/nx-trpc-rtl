import styled from '@emotion/styled';
import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient as initialTrpcClient } from '@trpc-client';
import NxWelcome from './nx-welcome';
import { Users } from './users';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const queryClient = useMemo(() => new QueryClient(), []);
  const trpcClient = useMemo(() => initialTrpcClient, []);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <StyledApp>
          <Users />
          <NxWelcome title="admin" />
        </StyledApp>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
