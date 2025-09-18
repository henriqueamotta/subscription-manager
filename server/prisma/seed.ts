import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Apaga dados existentes para evitar duplicatas ao rodar o seed várias vezes
  await prisma.service.deleteMany();

  await prisma.service.createMany({
    data: [
      {
        name: 'Netflix',
        logoUrl: '/logos/netflix.svg', // Criar essa pasta e arquivos depois
        brandColor: '#E50914',
      },
      {
        name: 'Spotify',
        logoUrl: '/logos/spotify.svg',
        brandColor: '#1DB954',
      },
      {
        name: 'Disney+',
        logoUrl: '/logos/disneyplus.svg',
        brandColor: '#113997',
      },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
