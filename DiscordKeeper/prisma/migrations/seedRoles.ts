import prisma from "@/lib/client";


async function main() {
  const roles = [
    {
      name: 'Client',
      description: 'Default role for new users',
    },
    {
      name: 'Support',
      description: 'Support team member',
    },
    {
      name: 'Mod',
      description: 'Moderator role',
    },
    {
      name: 'Admin',
      description: 'Admin role with full permissions',
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
