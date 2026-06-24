import { z } from 'zod';

// Necessário para a validação da novaSenha funcionar
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

// Validação de Dados Pessoais
export const editProfileSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, 'Nome obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  
  email: z
    .string()
    .trim()
    .email('E-mail inválido'),
});

// Validação para Alteração de Senha do Perfil
export const changePasswordSchema = z.object({
  novaSenha: z
    .string()
    .regex(
      passwordRegex,
      'A senha deve conter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial'
    ),
    
  confirmarSenha: z.string(),
}).refine(
  (data) => data.novaSenha === data.confirmarSenha,
  {
    path: ['confirmarSenha'],
    message: 'As senhas não coincidem',
  }
);