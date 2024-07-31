import { z } from 'zod';

const passwordRegex = new RegExp(
  "^(?=.*[A-Z])(?=.*[!@#\\$%\\^&\\*])(?=.*\\d).{8,}$"
);

const passwordErrorMessage = 
  "Password must be at least 8 characters long, " +
  "include at least one uppercase letter, one number, " +
  "and one special character.";

export const registerSchema = z.object({
  username: z.string().max(36, 'Username must be 36 characters or less'),
  email: z.string().email('Invalid email address'),
  password: z.string().regex(passwordRegex, passwordErrorMessage),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().regex(passwordRegex, passwordErrorMessage),
});
