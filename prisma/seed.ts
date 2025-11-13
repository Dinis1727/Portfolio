import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.project.createMany({
    data: [
    ],
  });
}

main()
  .then(() => console.log('🌱 Seed concluído com sucesso!'))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());