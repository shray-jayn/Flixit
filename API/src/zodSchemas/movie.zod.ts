import { z } from 'zod';

export const movieSchema = z.object({
  description: z.string().optional(),
  poster: z.string().optional(),
  thumbnail: z.string().optional(),
  title: z.string().max(255, 'Title must be 255 characters or less'),
  trailer: z.string().optional(),
  video: z.string().optional(),
  year: z.string().optional(),
  limit: z.string().optional(),
  genre: z.string().optional(),
  isSeries: z.boolean().default(false),
});
