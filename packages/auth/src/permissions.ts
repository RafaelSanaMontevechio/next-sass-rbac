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
  MEMBER(user, builder) {
    const { can } = builder;

    // can('invite', 'User');
    can(['create', 'get'], 'Project');
    can(['update', 'delete'], 'Project', {
      ownerId: {
        $eq: user.id,
      },
    });
  },
  BILLING(_user, _builder) {},
};
