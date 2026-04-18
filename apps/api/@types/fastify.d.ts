import 'fastify';

import { Organization, Member } from './../prisma/generated/prisma/client';

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId: () => Promise<string>;
    getUserMembership: (
      slug: string
    ) => Promise<{ organization: Organization; membership: Member }>;
  }
}
