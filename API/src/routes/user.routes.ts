import { Router } from 'express';
import { jwtVerify } from '../middleware/jwtVerify';
import { updateUser, deleteUser, getUser, getAllUsers, getUserStats } from '../controllers/user.controller';

const userRouter = Router();

userRouter.put('/:id', jwtVerify, updateUser);
userRouter.delete('/:id', jwtVerify, deleteUser);
userRouter.get('/find/:id', getUser);
userRouter.get('/', jwtVerify, getAllUsers);
userRouter.get('/stats', getUserStats);

export default userRouter;
