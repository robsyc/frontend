import { z } from 'zod';

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*\\-]).{8,}$");

export const languagesEnum = ["English", "Dutch", "French", "German", "Spanish", "Korean"] as const;

export const loginSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required'
        })
        .email('Email is invalid'),
    password: z
        .string({
            required_error: 'Password is required'
        })
        .max(32, 'Password must be less than 32 characters')
        .regex(passwordValidation, 'Password must be sufficiently strong'),
});

export const registerSchema = z.object({
    firstName: z
        .string({
            required_error: 'First name is required'
        }),
    lastName: z
        .string({
            required_error: 'Last name is required'
        }),
    email: z
        .string({
            required_error: 'Email is required'
        })
        .email('Email is invalid'),
    emailConfirm: z
        .string({
            required_error: 'Confirm your email'
        })
        .email('Email is invalid'),
    password: z
        .string({
            required_error: 'Password is required'
        })
        .max(32, 'Password must be less than 32 characters')
        .regex(passwordValidation, 'Password must be sufficiently strong'),
    passwordConfirm: z
        .string({
            required_error: 'Confirm your password'
        }),
    birthDate: z
        .string({
            required_error: 'Birth date is required'
        }),
    languages: z
        .array(z.enum(languagesEnum))
        .default(["English"]),
})
.refine((data) => data.email === data.emailConfirm, {
    path: ['emailConfirm'],
    message: 'Emails do not match'
})
.refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match'
});

export type LoginSchema = typeof loginSchema;
export type RegisterSchema = typeof registerSchema;
