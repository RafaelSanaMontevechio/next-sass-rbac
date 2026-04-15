import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { z } from 'zod';

import { hash } from 'bcryptjs';

import { prisma } from '@/lib/prisma';

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['auth'],
        summary: 'Create a new account.',
        body: z.object({
          name: z.string(),
          email: z.email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, replay) => {
      const { name, email, password } = request.body;

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userWithSameEmail) {
        return replay.status(400).send({
          message: 'User with the same email already exists.',
        });
      }

      const passwordHash = await hash(password, 6);

      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      });

      return replay.status(201).send();
    }
  );
}
