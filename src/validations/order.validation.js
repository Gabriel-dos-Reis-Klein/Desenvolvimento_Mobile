import { z } from 'zod';

z.setErrorMap((issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.received === 'null' || issue.received === 'undefined') {
      return { message: 'Este campo é obrigatório' };
    }
    return { message: `O tipo de dado está incorreto (esperava ${issue.expected})` };
  }
  
  if (issue.code === z.ZodIssueCode.invalid_string && issue.validation === 'datetime') {
    return { message: 'Formato de data e hora inválido' };
  }

  return { message: ctx.defaultError };
});

const TipoServicoEnum = z.enum(
  ['CONFECCAO', 'REPARO', 'MODIFICACAO'],
  {
    errorMap: () => ({
      message: 'Tipo de serviço inválido',
    }),
  }
);

const TipoPagamentoEnum = z.enum(
  ['PIX', 'DINHEIRO', 'CARTAO'],
  {
    errorMap: () => ({
      message: 'Tipo de pagamento inválido',
    }),
  }
);

const dateField = (fieldName) =>
  z
    .string()
    .trim()
    .datetime({
      message: `${fieldName} inválida`,
    });

const optionalDateField = (fieldName) =>
  z
    .string()
    .trim()
    .datetime({
      message: `${fieldName} inválida`,
    })
    .nullable()
    .optional();

export const orderItemSchema = z
  .object({
    id: z.union([z.string(), z.number()]).optional(),

    titulo: z
      .string()
      .trim()
      .min(1, 'O título do item é obrigatório'),

    descricao: z
      .string()
      .trim()
      .min(1, 'A descrição do item é obrigatória'),

    valor: z
      .number({
        required_error: 'O valor é obrigatório',
        invalid_type_error: 'O valor deve ser um número',
      })
      .positive('O valor deve ser maior que zero'),

    imagem: z.array(z.string()).default([]),

    dataPrazo: dateField('Data de prazo'),

    dataEntrega: optionalDateField('Data de entrega'),

    dataProva: optionalDateField('Data de prova'),

    tipo: TipoServicoEnum,

    status: z.string().optional().default('PRODUCAO'),

    statusPedido: z.string().optional().default('PRODUCAO'),
  })
  .superRefine((data, ctx) => {
    if (!data.dataPrazo) return;

    const prazo = new Date(data.dataPrazo);

    if (Number.isNaN(prazo.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['dataPrazo'],
        message: 'Data de prazo inválida',
      });
      return;
    }

    const isEdicao = data.id !== undefined && data.id !== null && data.id !== '';

    if (!isEdicao) {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const dataComparacao = new Date(prazo);
      dataComparacao.setHours(0, 0, 0, 0);

      if (dataComparacao < hoje) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['dataPrazo'],
          message: 'A data de prazo não pode ser uma data no passado',
        });
      }
    }

    if (data.dataEntrega) {
      const entrega = new Date(data.dataEntrega);

      if (entrega > prazo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['dataEntrega'],
          message: 'A data de entrega não pode ser posterior ao prazo final',
        });
      }
    }

    if (data.dataProva) {
      const prova = new Date(data.dataProva);

      if (prova > prazo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['dataProva'],
          message: 'A data da prova deve ocorrer antes do prazo final',
        });
      }
    }
  });

export const orderSchema = z
  .object({
    titulo: z
      .string()
      .trim()
      .min(1, 'O título do pedido é obrigatório'),

    itens: z
      .array(orderItemSchema)
      .min(1, 'O pedido deve conter pelo menos um item'),

    idCliente: z
      .string()
      .trim()
      .min(1, 'O cliente é obrigatório'),

    pagamentoAntecipado: z
      .number({
        invalid_type_error: 'O pagamento antecipado deve ser um número',
      })
      .nonnegative('O pagamento antecipado não pode ser negativo')
      .default(0),

    tipoPagamento: TipoPagamentoEnum,
  })
  .superRefine((data, ctx) => {
    const totalItens = data.itens.reduce(
      (acc, item) => acc + (item.valor || 0),
      0
    );

    if (data.pagamentoAntecipado > totalItens) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['pagamentoAntecipado'],
        message: 'O pagamento antecipado não pode ser maior que o valor total dos itens',
      });
    }
  });