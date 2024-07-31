import { Router } from 'express';
import jwtVerify from '../middlewares/jwtVerify';
import { updateUser, deleteUser, getUser, getAllUsers, getUserStats } from '../controllers/user.controller';

const userRouter = Router();

userRouter.use(jwtVerify); 

userRouter.put('/:userId', updateUser);
userRouter.delete('/:userId', deleteUser);
userRouter.get('/find/:userId', getUser);
userRouter.get('/', getAllUsers);
userRouter.get('/stats', getUserStats);

export default userRouter;
