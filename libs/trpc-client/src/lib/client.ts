import type { AppRouter } from '@trpc-server';
import { httpLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();

// type Params = {
//   headers?: {
//     Authorization: string;
//   };
// };
// const createLinks = (url: string, params: Params) => {
//   const { headers } = params;
//
//   return [
//     httpLink({
//       url,
//       headers() {
//         return {
//           ...headers,
//         };
//       },
//     }),
//   ];
// };

export const trpcClient = trpc.createClient({
  links: [
    httpLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});
