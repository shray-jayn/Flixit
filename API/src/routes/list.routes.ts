import { Router } from 'express';
import { createList, deleteList, getAllLists } from '../controllers/list.controller';
import jwtVerify from '../middlewares/jwtVerify';
import { listSchema } from '../zodSchemas/list.zod';
import validate from '../middlewares/validate';

const listRouter = Router();

listRouter.use(jwtVerify);

listRouter.post('/', validate(listSchema), createList);
listRouter.delete('/:userId', deleteList);
listRouter.get('/', getAllLists);

export default listRouter;
