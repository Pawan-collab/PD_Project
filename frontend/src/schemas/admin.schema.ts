/**
 * Admin Login Validation Schema using Zod
 */

import { z } from 'zod';

export const adminLoginSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Email or Username is required')
    .trim()
    .refine(
      (value) => {
        // Check if it's an email or username
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isUsername = value.length >= 3 && /^[a-zA-Z0-9_]+$/.test(value);
        return isEmail || isUsername;
      },
      {
        message: 'Must be a valid email or username (min 3 characters, alphanumeric only)',
      }
    ),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password is too long')
    .refine((value) => value.trim().length > 0, {
      message: 'Password cannot be empty or just spaces',
    }),
  rememberMe: z.boolean().optional().default(false),
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;
