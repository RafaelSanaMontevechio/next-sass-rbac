import z, { email } from 'zod';

import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { prisma } from '@/lib/prisma';

import { BadRequestError } from '../_errors/bad-request-error';

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/github',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with Github',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, replay) => {
      const { code } = request.body;

      const githubOAuth = new URL(
        'https://github.com/login/oauth/access_token'
      );

      githubOAuth.searchParams.set('client_id', 'Ov23liz4fnKThN3tbz3C');
      githubOAuth.searchParams.set(
        'client_secret',
        'a5fc768c2be78903d1ca001c48f83e73476e41da'
      );
      githubOAuth.searchParams.set(
        'redirect_uri',
        'http://localhost:3000/api/auth/callback'
      );
      githubOAuth.searchParams.set('code', code);

      //   const githubUser = await fetch(
      //     `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`
      //   ).then((response) => response.json());

      const githubAccessTokenResponse = await fetch(githubOAuth, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });

      const githubAccessTokenData = await githubAccessTokenResponse.json();

      const { access_token } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(githubAccessTokenData);

      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const githubUserData = await githubUserResponse.json();

      const {
        id: githubId,
        name,
        email,
        avatar_url: avatarUrl,
      } = z
        .object({
          id: z.number().transform((id) => id.toString()),
          avatar_url: z.url(),
          name: z.string().nullable(),
          email: z.email().nullable(),
        })
        .parse(githubUserData);

      if (email === null)
        throw new BadRequestError(
          'Your Github account must have an e-mail to be authenticated.'
        );

      let user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            avatarUrl,
          },
        });
      }

      let account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: 'GITHUB',
            userId: user.id,
          },
        },
      });

      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: 'GITHUB',
            providerAccountId: githubId,
            userId: user.id,
          },
        });
      }

      const token = await replay.jwtSign(
        {
          sub: user.id,
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
