import { z } from 'zod';

// Deve armazenar apenas os valores necessários do projeto para lidar com as permissões,
export const organizationSchema = z.object({
  __typename: z.literal('Organization').default('Organization'),
  id: z.string(),
  ownerId: z.string(),
});

export type Organization = z.infer<typeof organizationSchema>;
