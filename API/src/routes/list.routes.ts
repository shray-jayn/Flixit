import { Router } from 'express';
import { createList, deleteList, getAllLists } from '../controllers/list.controller';
import { jwtVerify } from '../middleware/jwtVerify';

const listRouter = Router();

listRouter.post('/', jwtVerify, createList);
listRouter.delete('/:userId', jwtVerify, deleteList);
listRouter.get('/', jwtVerify, getAllLists);

export default listRouter;
