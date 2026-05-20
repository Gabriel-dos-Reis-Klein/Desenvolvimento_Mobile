import { ORDER_STATUS } from './status';

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.WAITING]:
    'Aguardando',

  [ORDER_STATUS.PRODUCTION]:
    'Em andamento',

  [ORDER_STATUS.DELIVERED]:
    'Entregue',
};