import { defineAbilitiesFor } from '@sass/auth';

const ability = defineAbilitiesFor({ role: 'ADMIN' });

const userCanInviteSomeoneElse = ability.can('invite', 'User');
console.log(userCanInviteSomeoneElse);
