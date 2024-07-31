import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: { id: string; isAdmin: boolean };
}

const jwtVerify = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY_FOR_CRYPTOJS!, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Token is not valid!',
        });
      }
      req.user = user as { id: string; isAdmin: boolean };
      next();
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'You are not authenticated!',
    });
  }
};

export default jwtVerify;
