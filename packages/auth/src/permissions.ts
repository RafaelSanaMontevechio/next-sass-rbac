import { AbilityBuilder } from '@casl/ability';
import type { AppAbility } from '.';
import type { User } from './models/User';
import type { Role } from './roles';

type PermissionByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void;

export const permissions: Record<Role, PermissionByRole> = {
  ADMIN(_user, builder) {
    const { can } = builder;

    can('manage', 'all');
  },
  MEMBER(_user, builder) {
    const { can } = builder;

    // can('invite', 'User');
    can('manage', 'Project');
  },
  BILLING(_user, _builder) {},
};
