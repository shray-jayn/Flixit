import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  user?: { id: string; isAdmin: boolean };
}

export const updateUser = async (req: CustomRequest, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (req.user?.id === userId || req.user?.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY_FOR_CRYPTOJS!
      ).toString();
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: req.body,
      });

      res.status(200).json({
        success: true,
        updatedUser,
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
      message: 'You can update only your account!',
    });
  }
};

export const deleteUser = async (req: CustomRequest, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (req.user?.id === userId || req.user?.isAdmin) {
    try {
      await prisma.user.delete({
        where: { id: userId },
      });

      res.status(200).json({
        success: true,
        message: 'User has been deleted successfully!',
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
      message: 'You can delete only your account!',
    });
  }
};

export const getUser = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.userId },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const { password, ...info } = user;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllUsers = async (req: CustomRequest, res: Response): Promise<void> => {
  const query = req.query.new;

  if (req.user?.isAdmin) {
    try {
      const users = query
        ? await prisma.user.findMany({
            orderBy: { id: 'desc' },
            take: 5,
          })
        : await prisma.user.findMany();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'You are not allowed to see all users!',
        errorMessage: (err as Error).message,
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'You are not allowed to see all users!',
    });
  }
};

export const getUserStats = async (req: CustomRequest, res: Response): Promise<void> => {
  const today = new Date();
  const lastYear = new Date(today.setFullYear(today.getFullYear() - 1));

  try {
    const data = await prisma.user.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: lastYear,
        },
      },
      _count: {
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const monthArray = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const formattedData = data.map((item) => ({
      month: monthArray[new Date(item.createdAt).getMonth()],
      total: item._count.createdAt,
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json(err);
  }
};
