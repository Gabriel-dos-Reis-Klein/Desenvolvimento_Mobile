import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email('E-mail inválido'),

  password: z
    .string()
    .min(1, 'Senha obrigatória'),
});

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nome obrigatório'),

  email: z
    .string()
    .email('E-mail inválido')
    .trim(),

  password: z
    .string()
    .regex(
      passwordRegex,
      'A senha deve conter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial'
    ),

  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
  }
);