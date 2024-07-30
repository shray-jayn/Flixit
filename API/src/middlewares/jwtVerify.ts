import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: any;
}

const jwtVerify = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
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
      req.user = user;
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
