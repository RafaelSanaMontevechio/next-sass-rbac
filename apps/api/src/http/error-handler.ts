import z, { ZodError } from 'zod';
import type { FastifyInstance } from 'fastify';
import { BadRequestError } from './routes/_errors/bad-request-error';
import { UnauthorizedError } from './routes/_errors/unauthorized-error';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const ErrorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: z.treeifyError(error),
    });
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    });
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message,
    });
  }

  console.error(error);

  // send error to some observability platform

  return reply.status(500).send({
    message: 'Internal server error',
  });
};
