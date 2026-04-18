import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { z } from 'zod';

import { organizationSchema } from '@sass/auth';

import { auth } from '@/http/middlewares/auth';

import { prisma } from '@/lib/prisma';

import { getUserPermissions } from '@/utils/get-user-permissions';

import { UnauthorizedError } from '../_errors/unauthorized-error';

export async function shutdownOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Shutdown an organization.',
          security: [{ bearerAuth: [] }],
          params: z.object({}),
          response: { 204: z.void() },
        },
      },
      async (request, replay) => {
        const { slug } = request.params;

        const userId = await request.getCurrentUserId();
        const { membership, organization } =
          await request.getUserMembership(slug);

        const authOrganization = organizationSchema.parse(organization);

        const { cannot } = getUserPermissions(userId, membership.role);

        if (cannot('delete', authOrganization)) {
          throw new UnauthorizedError(
            'You are not allowed to shutdown this organization.'
          );
        }

        await prisma.organization.delete({
          where: {
            id: organization.id,
          },
        });

        return replay.status(204).send();
      }
    );
}
