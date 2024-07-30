import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import listRouter from './routes/list.routes';
import movieRouter from './routes/movie.routes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/lists', listRouter);
app.use('/api/movies', movieRouter);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
    console.log(`Server is running at http://localhost:${port}`);
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
});
