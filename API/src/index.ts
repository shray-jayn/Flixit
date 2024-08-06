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

const allowedOrigins = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
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
