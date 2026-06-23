import { z } from 'zod';
import { passwordRegex } from './auth.validation';

export const editProfileSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, 'Nome obrigatório'),

  email: z
    .string()
    .trim()
    .email('E-mail inválido'),
});

export const changePasswordSchema = z
  .object({
    novaSenha: z
      .string()
      .regex(
        passwordRegex,
        'A senha deve conter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial'
      ),

    confirmarSenha: z.string(),
  })
  .refine((data) => data.novaSenha === data.confirmarSenha, {
    path: ['confirmarSenha'],
    message: 'As senhas não coincidem',
  });

export const newUserSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(1, 'Nome obrigatório'),

    email: z
      .string()
      .trim()
      .email('E-mail inválido'),

    senha: z
      .string()
      .regex(
        passwordRegex,
        'A senha deve conter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial'
      ),

    confirmarSenha: z.string(),

    permissao: z.enum(['ADMIN', 'FUNCIONARIO'], {
      errorMap: () => ({ message: 'Permissão inválida' }),
    }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    path: ['confirmarSenha'],
    message: 'As senhas não coincidem',
  });
