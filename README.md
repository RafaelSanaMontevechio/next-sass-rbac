# Next.js SaaS + RBAC

This project contains all the necessary boilerplate to setup a multi-tenant SaaS with Next.js including authentication and RBAC authorization.

## Features

### Authentication

- [ ] It should be able to authenticate using e-mail & password;
- [ ] It should be able to authenticate using Github account;
- [ ] It should be able to recover password using e-mail;
- [ ] It should be able to create an account (e-mail, name and password);

### Organizations

- [ ] It should be able to create a new organization;
- [ ] It should be able to get organizations to which the user belongs;
- [ ] It should be able to update an organization;
- [ ] It should be able to shutdown an organization;
- [ ] It should be able to transfer organization ownership;

### Invites

- [ ] It should be able to invite a new member (e-mail, role);
- [ ] It should be able to accept an invite;
- [ ] It should be able to revoke a pending invite;

### Members

- [ ] It should be able to get organization members;
- [ ] It should be able to update a member role;

### Projects

- [ ] It should be able to get projects within a organization;
- [ ] It should be able to create a new project (name, url, description);
- [ ] It should be able to update a project (name, url, description);
- [ ] It should be able to delete a project;

### Billing

- [ ] It should be able to get billing details for organization ($20 per project / $10 per member excluding billing role);

---

### RBAC

Roles & permissions.

#### **Roles**

- Owner (count as administrator)
- Administrator
- Member
- Billing (one per organization)
- Anonymous

#### **Permissions table**

<table>
  <thead>
    <tr>
      <th>Permissões</th>
      <th>Administrator</th>
      <th>Member</th>
      <th>Billing</th>
      <th>Anonymous</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Update organization</td>
      <td>✅</td>
      <td>❌</td>
      <td>❌</td>
      <td>❌</td>
    </tr>
    <tr>
      <td>Delete organization</td>
      <td>✅</td>
      <td>❌</td>
      <td>❌</td>
      <td>❌</td>
    </tr>
      <tr>
      <td>Invite a member</td>
      <td>✅</td>
      <td>❌</td>
      <td>❌</td>
      <td>❌</td>
    </tr>
    </tr>
      <tr>
      <td>Revoke an invite</td>
      <td>✅</td>
      <td>❌</td>
      <td>❌</td>
      <td>❌</td>
    </tr>
    </tr>
      <tr>
      <td>List members</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>❌</td>
    </tr>
    </tr>
      <tr>
      <td>Transfer ownership</td>
      <td>⚠️</td>
      <td>❌</td>
      <td>❌</td>
      <td>❌</td>
    </tr>
    </tr>
      <tr>
      <td>Update member role</td>
      <td>✅</td>
      <td>❌</td>
      <td>❌</td>
      <td>❌</td>
    </tr>
    </tr>
      <tr>
      <td>Delete member</td>
      <td>✅</td>
      <td>⚠️</td>
      <td>❌</td>
      <td>❌</td>
    </tr>
    </tr>
      <tr>
      <td>List projects</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>❌</td>
    </tr>
    </tr>
      <tr>
      <td>Create a new project</td>
      <td>✅</td>
      <td>✅</td>
      <td>❌</td>
      <td>❌</td>
    </tr>
    </tr>
      <tr>
      <td>Update a project</td>
      <td>✅</td>
      <td>⚠️</td>
      <td>❌</td>
      <td>❌</td>
    </tr>
    </tr>
      <tr>
      <td>Delete a project</td>
      <td>✅</td>
      <td>⚠️</td>
      <td>❌</td>
      <td>❌</td>
    </tr>
    </tr>
      <tr>
      <td>Get billing details</td>
      <td>✅</td>
      <td>❌</td>
      <td>✅</td>
      <td>❌</td>
    </tr>
    </tr>
      <tr>
      <td>Export billing details </td>
      <td>✅</td>
      <td>❌</td>
      <td>✅</td>
      <td>❌</td>
    </tr>
  </tbody>
</table>

✅ = allowed ❌ = not allowed ⚠️ = allowed w/ conditions

**Conditions**

- Only owners may transfer organization ownership;
- Only administrators and project authors may update/delete the project;
- Members can leave their own organization;
