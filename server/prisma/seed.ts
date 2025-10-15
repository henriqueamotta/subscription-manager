import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Apagar dados existentes
  await prisma.subscription.deleteMany();
  await prisma.service.deleteMany();
  await prisma.category.deleteMany();

  // Criar categorias
  console.log('Creating categories...');
  await prisma.category.createMany({
    data: [
      { name: 'Streaming' }, { name: 'Music' }, { name: 'Software' },
      { name: 'Productivity' }, { name: 'Cloud' },
    ],
  });

  // Buscar categorias criadas para obter seus IDs
  const streaming = await prisma.category.findUnique({ where: { name: 'Streaming' } });
  const music = await prisma.category.findUnique({ where: { name: 'Music' } });
  const software = await prisma.category.findUnique({ where: { name: 'Software' } });
  const productivity = await prisma.category.findUnique({ where: { name: 'Productivity' } });
  const cloud = await prisma.category.findUnique({ where: { name: 'Cloud' } });

  if (!streaming || !music || !software || !productivity || !cloud) {
    console.error("One or more categories were not found. Aborting seed.");
    return;
  }

  // Criar serviços
  console.log('Creating services...');
  await prisma.service.createMany({
    data: [
      // Streaming
      { name: 'Netflix', logoUrl: '/logos/netflix.svg', brandColor: '#E50914', categoryId: streaming.id },
      { name: 'Amazon Prime Video', logoUrl: '/logos/primevideo.svg', brandColor: '#00A8E1', categoryId: streaming.id },
      { name: 'Disney+', logoUrl: '/logos/disneyplus.svg', brandColor: '#113997', categoryId: streaming.id },
      { name: 'HBO Max', logoUrl: '/logos/hbo.svg', brandColor: '#8A2BE2', categoryId: streaming.id },
      { name: 'Apple TV+', logoUrl: '/logos/appletv.svg', brandColor: '#BDBDBD', categoryId: streaming.id },
      { name: 'Crunchyroll', logoUrl: '/logos/crunchyroll.svg', brandColor: '#F47521', categoryId: streaming.id },
      { name: 'YouTube Premium', logoUrl: '/logos/youtubepremium.svg', brandColor: '#FF0000', categoryId: streaming.id },
      // Music
      { name: 'Spotify', logoUrl: '/logos/spotify.svg', brandColor: '#1DB954', categoryId: music.id },
      { name: 'Deezer', logoUrl: '/logos/deezer.svg', brandColor: '#FEAA2D', categoryId: music.id },
      { name: 'Apple Music', logoUrl: '/logos/applemusic.svg', brandColor: '#FC3C44', categoryId: music.id },
      { name: 'Tidal', logoUrl: '/logos/tidal.svg', brandColor: '#000000', categoryId: music.id },
      // Software e Productivity
      { name: 'Adobe Creative Cloud', logoUrl: '/logos/adobe.svg', brandColor: '#FF0000', categoryId: software.id },
      { name: 'Canva', logoUrl: '/logos/canva.svg', brandColor: '#00C4CC', categoryId: software.id },
      { name: 'Figma', logoUrl: '/logos/figma.svg', brandColor: '#F24E1E', categoryId: software.id },
      { name: 'GitHub Pro', logoUrl: '/logos/github.svg', brandColor: '#181717', categoryId: software.id },
      { name: 'Microsoft 365', logoUrl: '/logos/microsoft365.svg', brandColor: '#E83B01', categoryId: software.id },
      { name: 'Notion', logoUrl: '/logos/notion.svg', brandColor: '#000000', categoryId: productivity.id },
      { name: 'LinkedIn Premium', logoUrl: '/logos/linkedin.svg', brandColor: '#0A66C2', categoryId: productivity.id },
      // Cloud
      { name: 'Dropbox', logoUrl: '/logos/dropbox.svg', brandColor: '#0061FF', categoryId: cloud.id },
      { name: 'Google Workspace', logoUrl: '/logos/googleworkspace.svg', brandColor: '#4285F4', categoryId: cloud.id },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
