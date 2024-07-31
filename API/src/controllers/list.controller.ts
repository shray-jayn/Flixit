import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  user?: { id: string; isAdmin: boolean };
}

export const createList = async (req: CustomRequest, res: Response): Promise<void> => {
  if (req.user?.isAdmin) {
    try {
      const newList = await prisma.list.create({
        data: req.body,
      });
      res.status(200).json(newList);
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
      message: 'You are not allowed to create lists!',
    });
  }
};

export const deleteList = async (req: CustomRequest, res: Response): Promise<void> => {
  if (req.user?.isAdmin) {
    try {
      await prisma.list.delete({
        where: { id: req.params.userId },
      });
      res.status(200).json({
        success: true,
        message: 'The list has been deleted...',
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
      message: 'You are not allowed to delete lists!',
    });
  }
};

export const getAllLists = async (req: CustomRequest, res: Response): Promise<void> => {
  const typeQuery = req.query.type as string;
  const genreQuery = req.query.genre as string;

  try {
    let lists;
    if (typeQuery) {
      if (genreQuery) {
        lists = await prisma.list.findMany({
          where: {
            type: typeQuery,
            genre: genreQuery,
          },
          take: 10,
        });
      } else {
        lists = await prisma.list.findMany({
          where: { type: typeQuery },
          take: 10,
        });
      }
    } else {
      lists = await prisma.list.findMany({
        take: 10,
      });
    }
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      errorMessage: (error as Error).message,
    });
  }
};
