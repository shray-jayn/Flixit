import { Router } from 'express';
import { createMovie, updateMovie, deleteMovie, getMovie, getRandomMovie, getAllMovies } from '../controllers/movie.controller';
import jwtVerify from '../middlewares/jwtVerify';
import { movieSchema } from '../zodSchemas/movie.zod';
import validate from '../middlewares/validate';

const movieRouter = Router();

movieRouter.use(jwtVerify); 

movieRouter.post('/', validate(movieSchema), createMovie);
movieRouter.put('/:userId', updateMovie);
movieRouter.delete('/:userId', deleteMovie);
movieRouter.get('/find/:userId', getMovie);
movieRouter.get('/', getAllMovies);
movieRouter.get('/random', getRandomMovie);

export default movieRouter;
