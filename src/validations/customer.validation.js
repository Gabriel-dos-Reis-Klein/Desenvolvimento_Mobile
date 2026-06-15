import { z } from 'zod';

export const customerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Nome obrigatório'),

  phone: z
    .string()
    .trim()
    .min(10, 'Telefone inválido'),

  description: z
    .string()
    .trim()
    .optional(),
});