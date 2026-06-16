import { z } from 'zod';

export const customerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Nome obrigatório'),

  phone: z
    .string()
    .trim()
    .regex(
      /^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/,
      'Telefone inválido'
    ),

  description: z
    .string()
    .trim()
    .optional(),
});