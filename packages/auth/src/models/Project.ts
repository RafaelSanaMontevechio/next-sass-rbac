import { z } from 'zod';

// Deve armazenar apenas os valores necessários do projeto para lidar com as permissões,
export const projectSchema = z.object({
  __typename: z.literal('Project').default('Project'),
  id: z.string(),
  ownerId: z.string(),
});

export type Project = z.infer<typeof projectSchema>;
