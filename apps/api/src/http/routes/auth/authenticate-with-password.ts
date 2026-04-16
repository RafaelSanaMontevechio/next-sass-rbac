import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import z, { email } from 'zod';

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with e-mail and password',
        body: z.object({
          email: z.email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, replay) => {
      const { email, password } = request.body;

      const userFromEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!userFromEmail) {
        return replay.status(400).send({
          message: 'Invalid credentials.',
        });
      }

      if (userFromEmail.passwordHash === null) {
        return replay.status(400).send({
          message:
            'User does not have a password set up. Use social login instead.',
        });
      }

      const isPasswordCorrect = await compare(
        password,
        userFromEmail.passwordHash
      );

      if (!isPasswordCorrect) {
        return replay.status(400).send({
          message: 'Invalid credentials.',
        });
      }

      const token = await replay.jwtSign(
        {
          sub: userFromEmail.id,
        },
        {
          expiresIn: '7d',
        }
      );

      return replay.status(201).send({
        token,
      });
    }
  );
}
