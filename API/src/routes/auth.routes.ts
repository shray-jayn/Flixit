import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';
import { registerSchema, loginSchema } from '../zodSchemas/auth.zod';
import validate from '../middlewares/validate';

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), registerUser);
authRouter.post('/login', validate(loginSchema), loginUser);

export default authRouter;
