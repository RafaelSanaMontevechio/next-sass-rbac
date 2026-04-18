import { defineAbilitiesFor, userSchema, type Role } from '@sass/auth';

export function getUserPermissions(userId: string, role: Role) {
  const authUser = userSchema.parse({
    id: userId,
    role,
  });

  const ability = defineAbilitiesFor(authUser);

  return ability;
}
