import { ability } from '@sass/auth';

const userCanInviteSomeoneElse = ability.can('invite', 'User');
console.log(userCanInviteSomeoneElse);
