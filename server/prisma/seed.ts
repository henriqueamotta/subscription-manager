import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Apaga dados existentes para evitar duplicatas ao rodar o seed várias vezes
  await prisma.subscription.deleteMany();

  // Apaga serviços existentes para evitar duplicatas ao rodar o seed várias vezes
  await prisma.service.deleteMany();

  await prisma.service.createMany({
    data: [
      { name: 'Adobe Creative Cloud', logoUrl: '/logos/adobe.svg', brandColor: '#FF0000' },
      { name: 'Amazon Prime Video', logoUrl: '/logos/primevideo.svg', brandColor: '#00A8E1' },
      { name: 'Apple Music', logoUrl: '/logos/applemusic.svg', brandColor: '#FC3C44' },
      { name: 'Apple TV+', logoUrl: '/logos/appletv.svg', brandColor: '#BDBDBD' },
      { name: 'Canva', logoUrl: '/logos/canva.svg', brandColor: '#00C4CC' },
      { name: 'Crunchyroll', logoUrl: '/logos/crunchyroll.svg', brandColor: '#F47521' },
      { name: 'Deezer', logoUrl: '/logos/deezer.svg', brandColor: '#FEAA2D' },
      { name: 'Disney+', logoUrl: '/logos/disneyplus.svg', brandColor: '#113997' },
      { name: 'Dropbox', logoUrl: '/logos/dropbox.svg', brandColor: '#0061FF' },
      { name: 'Figma', logoUrl: '/logos/figma.svg', brandColor: '#F24E1E' },
      { name: 'GitHub Pro', logoUrl: '/logos/github.svg', brandColor: '#181717' },
      { name: 'Google Workspace', logoUrl: '/logos/googleworkspace.svg', brandColor: '#4285F4' },
      { name: 'HBO Max', logoUrl: '/logos/hbo.svg', brandColor: '#8A2BE2' },
      { name: 'LinkedIn Premium', logoUrl: '/logos/linkedin.svg', brandColor: '#0A66C2' },
      { name: 'Microsoft 365', logoUrl: '/logos/microsoft365.svg', brandColor: '#E83B01' },
      { name: 'Netflix', logoUrl: '/logos/netflix.svg', brandColor: '#E50914' },
      { name: 'Notion', logoUrl: '/logos/notion.svg', brandColor: '#000000' },
      { name: 'Spotify', logoUrl: '/logos/spotify.svg', brandColor: '#1DB954' },
      { name: 'Tidal', logoUrl: '/logos/tidal.svg', brandColor: '#000000' },
      { name: 'YouTube Premium', logoUrl: '/logos/youtubepremium.svg', brandColor: '#FF0000' },
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
