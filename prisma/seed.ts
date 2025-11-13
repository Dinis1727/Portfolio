import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.project.createMany({
    data: [
      {
        title: 'API Portfolio',
        description: 'Backend em NestJS + Prisma + PostgreSQL',
        tags: ['NestJS', 'Prisma', 'PostgreSQL'],
      },
      {
        title: 'Site Pessoal',
        description: 'Frontend em Next.js + TailwindCSS',
        tags: ['Next.js', 'React', 'Tailwind'],
      },
    ],
  });
}

main()
  .then(() => console.log('🌱 Seed concluído com sucesso!'))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());