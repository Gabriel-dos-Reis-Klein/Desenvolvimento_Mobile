import { httpErrorMap } from './httpErrorMap';

export function parseHttpError(error) {
  const status = error.response?.status;

  const apiMessage =
    error.response?.data?.errorMessage ||
    error.response?.data?.message;

  if (!error.response) {
    return {
      type: 'network',
      message: 'Sem conexão com o servidor',
      status: null,
    };
  }

  const mapped = httpErrorMap[status];

  if (mapped) {
    return {
      type: mapped.type,
      message: apiMessage || mapped.message,
      status,
    };
  }

  return {
    type: status >= 500 ? 'server' : 'unknown',
    message: apiMessage || 'Erro inesperado',
    status,
  };
}