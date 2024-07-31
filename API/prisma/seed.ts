import { PrismaClient } from '@prisma/client';
import CryptoJS from 'crypto-js';

const prisma = new PrismaClient();

async function main() {
  const password = CryptoJS.AES.encrypt('password123', process.env.SECRET_KEY_FOR_CRYPTOJS!).toString();

  // Create users
  await prisma.user.createMany({
    data: [
      {
        email: 'user1@example.com',
        username: 'user1',
        password: password,
        profilePic: '',
        isAdmin: false,
      },
      {
        email: 'admin@example.com',
        username: 'admin',
        password: password,
        profilePic: '',
        isAdmin: true,
      },
    ],
  });

  // Create movies
  await prisma.movie.createMany({
    data: [
      {
        title: 'Movie 1',
        description: 'Description for Movie 1',
        poster: '',
        thumbnail: '',
        trailer: '',
        video: '',
        year: '2024',
        limit: '13+',
        genre: 'Action',
        isSeries: false,
      },
      {
        title: 'Movie 2',
        description: 'Description for Movie 2',
        poster: '',
        thumbnail: '',
        trailer: '',
        video: '',
        year: '2023',
        limit: '18+',
        genre: 'Drama',
        isSeries: true,
      },
    ],
  });

  // Create lists
  await prisma.list.createMany({
    data: [
      {
        title: 'List 1',
        type: 'movie',
        genre: 'Action',
        content: [],
      },
      {
        title: 'List 2',
        type: 'series',
        genre: 'Drama',
        content: [],
      },
    ],
  });

  console.log('Database has been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
