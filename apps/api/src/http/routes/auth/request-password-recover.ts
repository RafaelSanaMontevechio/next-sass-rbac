import z from 'zod';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { prisma } from '@/lib/prisma';

export async function requestPasswordRecover(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password-recover',
    {
      schema: {
        tags: ['auth'],
        summary: 'Request password recover.',
        body: z.object({
          email: z.email(),
        }),
        response: {
          201: z.void(),
        },
      },
    },
    async (request, replay) => {
      const { email } = request.body;

      const userFromEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!userFromEmail) return replay.status(201).send();

      const { id: code } = await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVER',
          userId: userFromEmail.id,
        },
      });

      // TODO: send email with recover link

      console.log(`Recover password code: ${code}`);

      return replay.status(201).send();
    }
  );
}
