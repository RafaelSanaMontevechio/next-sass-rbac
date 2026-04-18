import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import type { CreateAbility, MongoAbility } from '@casl/ability';

import { z } from 'zod';

import type { User } from './models/User';

import { permissions } from './permissions';

import { userSubject } from './subjects/user';
import { inviteSubject } from './subjects/invite';
import { billingSubject } from './subjects/billing';
import { projectSubject } from './subjects/project';
import { organizationSubject } from './subjects/organization';

export * from './models/User';
export * from './models/Project';
export * from './models/Organization';
export * from './roles';

const appAbilitiesSchema = z.union([
  projectSubject,
  userSubject,
  organizationSubject,
  inviteSubject,
  billingSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
]);

type AppAbilities = z.infer<typeof appAbilitiesSchema>;

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilitiesFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility);

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`No permissions defined for role: ${user.role}`);
  }

  permissions[user.role](user, builder);

  //Utiliza o campo __typename para identificar o tipo da subject, isso é necessário para o CASL funcionar corretamente com objetos complexos
  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename;
    },
  });

  return ability;
}
