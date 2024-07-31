import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  user?: { id: string; isAdmin: boolean };
}

export const createMovie = async (req: CustomRequest, res: Response): Promise<void> => {
  if (req.user?.isAdmin) {
    try {
      const newMovie = await prisma.movie.create({
        data: req.body,
      });
      res.status(200).json(newMovie);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        errorMessage: (error as Error).message,
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'You are not allowed to create movies!',
    });
  }
};

export const updateMovie = async (req: CustomRequest, res: Response): Promise<void> => {
  if (req.user?.isAdmin) {
    try {
      const updatedMovie = await prisma.movie.update({
        where: { id: req.params.userId },
        data: req.body,
      });
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        errorMessage: (error as Error).message,
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'You are not allowed to update movies!',
    });
  }
};

export const deleteMovie = async (req: CustomRequest, res: Response): Promise<void> => {
  if (req.user?.isAdmin) {
    try {
      await prisma.movie.delete({
        where: { id: req.params.userId },
      });
      res.status(200).json({
        success: true,
        message: 'The movie has been deleted...',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        errorMessage: (error as Error).message,
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'You are not allowed to delete movies!',
    });
  }
};

export const getMovie = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: req.params.userId },
    });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      errorMessage: (error as Error).message,
    });
  }
};

export const getAllMovies = async (req: CustomRequest, res: Response): Promise<void> => {
  if (req.user?.isAdmin) {
    const genreQuery = req.query.genre as string;

    try {
      const movies = genreQuery
        ? await prisma.movie.findMany({
            where: {
              genre: {
                in: [genreQuery],
              },
            },
          })
        : await prisma.movie.findMany();
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        errorMessage: (error as Error).message,
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'You are not allowed to view movies!',
    });
  }
};

export const getRandomMovie = async (req: CustomRequest, res: Response): Promise<void> => {
  const type = req.query.type as string;

  try {
    const movie = await prisma.movie.aggregate({
      where: { isSeries: type === 'series' },
      take: 1,
      orderBy: { id: 'asc' },
    });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      errorMessage: (error as Error).message,
    });
  }
};
