import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import type { ForcedSubject, CreateAbility, MongoAbility } from '@casl/ability';

//Define "permissões"
const actions = ['manage', 'invite', 'delete'] as const;

// Define "objetos/Entidades" que as permissões podem ser aplicadas
const subjects = ['User', 'all'] as const;

type AppAbilities = [
  (typeof actions)[number],
  (
    | (typeof subjects)[number]
    | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
  ),
];

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

const { build, can, cannot } = new AbilityBuilder(createAppAbility);

can('invite', 'User');
cannot('delete', 'User');

export const ability = build();
