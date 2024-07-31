import { z } from 'zod';

export const listSchema = z.object({
  title: z.string().max(255, 'Title must be 255 characters or less'),
  type: z.string().optional(),
  genre: z.string().optional(),
  content: z.array(z.string()).optional(),
});
