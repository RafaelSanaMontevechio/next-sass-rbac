import { AbilityBuilder } from '@casl/ability';
import type { AppAbility } from '.';
import type { User } from './models/User';
import type { Role } from './roles';

type PermissionByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void;

export const permissions: Record<Role, PermissionByRole> = {
  ADMIN(user, builder) {
    const { can, cannot } = builder;

    can('manage', 'all');

    cannot(['transfer_ownership', 'update'], 'Organization');
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: {
        $eq: user.id,
      },
    });
  },

  MEMBER(user, builder) {
    const { can } = builder;

    can('get', 'User');
    can(['create', 'get'], 'Project');
    can(['update', 'delete'], 'Project', {
      ownerId: {
        $eq: user.id,
      },
    });
  },

  BILLING(_user, builder) {
    const { can } = builder;

    can('manage', 'Billing');
  },
};
