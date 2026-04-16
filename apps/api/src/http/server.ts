import { fastify } from 'fastify';
import { fastifyJwt } from '@fastify/jwt';
import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';

import { env } from '@sass/env';

import { getProfile } from './routes/auth/get-profile';
import { createAccount } from './routes/auth/create-account';
import { resetPassword } from './routes/auth/reset-password';
import { requestPasswordRecover } from './routes/auth/request-password-recover';
import { authenticateWithGithub } from './routes/auth/authenticate-with-github';
import { authenticateWithPassword } from './routes/auth/authenticate-with-password';

import { createOrganization } from './routes/orgs/create-organization';

import { ErrorHandler } from './error-handler';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.setErrorHandler(ErrorHandler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NestJS API documentation',
      description: 'Fullstack saas app with multi-tenant & RBAC.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {},
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyCors, {
  origin: '*',
});

app.register(createAccount);
app.register(authenticateWithPassword);
app.register(authenticateWithGithub);
app.register(getProfile);
app.register(requestPasswordRecover);
app.register(resetPassword);

app.register(createOrganization);

app.listen({ port: env.SERVER_PORT }, (err, _address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running!`);
});
