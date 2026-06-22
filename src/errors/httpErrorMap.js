export const httpErrorMap = {
  400: {
    type: "validation",
    message: "Dados inválidos",
  },

  401: {
    type: "unauthorized",
    message: "Sessão expirada ou inválida",
  },

  403: {
    type: "forbidden",
    message: "Você não tem permissão para isso",
  },

  404: {
    type: "not_found",
    message: "Recurso não encontrado",
  },

  409: {
    type: "conflict",
    message: "Conflito de dados",
  },

  500: {
    type: "server",
    message: "Erro no servidor",
  },

  502: {
    type: "server",
    message: "Servidor indisponível",
  },

  503: {
    type: "server",
    message: "Serviço temporariamente indisponível",
  },

  504: {
    type: "server",
    message: "Tempo de resposta excedido",
  },
};