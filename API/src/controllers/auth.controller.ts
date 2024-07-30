import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User with the given email or username already exists',
      });
      return;
    }

    const hashedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY_FOR_CRYPTOJS!).toString();

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY_FOR_CRYPTOJS!,
      { expiresIn: '30d' }
    );

    const { password: _, ...userInfo } = user;

    res.status(201).json({
      success: true,
      user: userInfo,
      accessToken,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      errorMessage: (error as Error).message,
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY_FOR_CRYPTOJS!);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== password) {
        res.status(401).json({
          success: false,
          message: 'Incorrect email or password',
        });
        return;
      }
    } else {
      res.status(401).json({
        success: false,
        message: 'Incorrect email or password',
      });
      return;
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY_FOR_CRYPTOJS!,
      { expiresIn: '30d' }
    );

    const { password: _, ...userInfo } = user;

    res.status(200).json({
      success: true,
      user: userInfo,
      accessToken,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      errorMessage: (error as Error).message,
    });
  }
};
