import { PrismaClient } from '../prisma/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { faker } from '@faker-js/faker';
import { hash } from 'bcryptjs';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function seed() {
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash('123456', 1);

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@me.com',
      avatarUrl: 'https://github.com/rafaelsanamontevechio.png',
      passwordHash,
    },
  });

  const secondUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  });

  const thirdUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  });

  //   const { user, secondUser, thirdUser } = await prisma.user.createMany({
  //     data: [
  //       {
  //         name: 'John Doe',
  //         email: 'johndoe@me.com',
  //         avatarUrl: 'https://github.com/rafaelsanamontevechio.png',
  //         passwordHash,
  //       },
  //       {
  //         name: faker.person.fullName(),
  //         email: faker.internet.email(),
  //         avatarUrl: faker.image.avatarGitHub(),
  //         passwordHash,
  //       },
  //       {
  //         name: faker.person.fullName(),
  //         email: faker.internet.email(),
  //         avatarUrl: faker.image.avatarGitHub(),
  //         passwordHash,
  //       },
  //     ],
  //   });

  await prisma.organization.create({
    data: {
      name: 'Acme Inc (Admin)',
      domain: 'acme.com',
      slug: 'acme-admin',
      avatarUrl: faker.image.avatarGitHub(),
      shouldAttachUsersByDomain: true,
      userId: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.word(5),
              slug: faker.lorem.slug(2),
              description: faker.lorem.paragraphs(),
              avatarUrl: faker.image.avatarGitHub(),
              //userId = ownerId (dono da projeto)
              userId: faker.helpers.arrayElement([
                user.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
            {
              name: faker.lorem.word(5),
              slug: faker.lorem.slug(2),
              description: faker.lorem.paragraphs(),
              avatarUrl: faker.image.avatarGitHub(),
              //userId = ownerId (dono da projeto)
              userId: faker.helpers.arrayElement([
                user.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
            {
              name: faker.lorem.word(5),
              slug: faker.lorem.slug(2),
              description: faker.lorem.paragraphs(),
              avatarUrl: faker.image.avatarGitHub(),
              //userId = ownerId (dono da projeto)
              userId: faker.helpers.arrayElement([
                user.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'ADMIN',
            },
            {
              userId: secondUser.id,
              role: 'MEMBER',
            },
            {
              userId: thirdUser.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  });

  await prisma.organization.create({
    data: {
      name: 'Acme Inc (Member)',
      slug: 'acme-member',
      avatarUrl: faker.image.avatarGitHub(),
      userId: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.word(5),
              slug: faker.lorem.slug(2),
              description: faker.lorem.paragraphs(),
              avatarUrl: faker.image.avatarGitHub(),
              //userId = ownerId (dono da projeto)
              userId: faker.helpers.arrayElement([
                user.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
            {
              name: faker.lorem.word(5),
              slug: faker.lorem.slug(2),
              description: faker.lorem.paragraphs(),
              avatarUrl: faker.image.avatarGitHub(),
              //userId = ownerId (dono da projeto)
              userId: faker.helpers.arrayElement([
                user.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
            {
              name: faker.lorem.word(5),
              slug: faker.lorem.slug(2),
              description: faker.lorem.paragraphs(),
              avatarUrl: faker.image.avatarGitHub(),
              //userId = ownerId (dono da projeto)
              userId: faker.helpers.arrayElement([
                user.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'MEMBER',
            },
            {
              userId: secondUser.id,
              role: 'ADMIN',
            },
            {
              userId: thirdUser.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  });

  await prisma.organization.create({
    data: {
      name: 'Acme Inc (Billing)',
      slug: 'acme-billing',
      avatarUrl: faker.image.avatarGitHub(),
      userId: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.word(5),
              slug: faker.lorem.slug(2),
              description: faker.lorem.paragraphs(),
              avatarUrl: faker.image.avatarGitHub(),
              //userId = ownerId (dono da projeto)
              userId: faker.helpers.arrayElement([
                user.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
            {
              name: faker.lorem.word(5),
              slug: faker.lorem.slug(2),
              description: faker.lorem.paragraphs(),
              avatarUrl: faker.image.avatarGitHub(),
              //userId = ownerId (dono da projeto)
              userId: faker.helpers.arrayElement([
                user.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
            {
              name: faker.lorem.word(5),
              slug: faker.lorem.slug(2),
              description: faker.lorem.paragraphs(),
              avatarUrl: faker.image.avatarGitHub(),
              //userId = ownerId (dono da projeto)
              userId: faker.helpers.arrayElement([
                user.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'BILLING',
            },
            {
              userId: secondUser.id,
              role: 'ADMIN',
            },
            {
              userId: thirdUser.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  });
}

seed().then(async () => {
  console.log('Database has been seeded');
});
