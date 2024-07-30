import { Router } from 'express';
import { jwtVerify } from '../middleware/jwtVerify';
import { updateMovie, deleteMovie, getMovie, getRandomMovie, createMovie, getAllMovies } from '../controllers/movie.controller';

const movieRouter = Router();

movieRouter.post('/', jwtVerify, createMovie);
movieRouter.put('/:userId', jwtVerify, updateMovie);
movieRouter.delete('/:userId', jwtVerify, deleteMovie);
movieRouter.get('/find/:userId', getMovie);
movieRouter.get('/', jwtVerify, getAllMovies);
movieRouter.get('/random', getRandomMovie);

export default movieRouter;
