import { ORDER_TYPES } from "../constants";

export const ORDER_TYPE_STYLES = {
  [ORDER_TYPES.MANUFACTURING]: {
    label: 'Confecção',
    icon: 'shirt',
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },

  [ORDER_TYPES.MODIFICATION]: {
    label: 'Modificação',
    icon: 'scissors',
    color: '#14B8A6',
    backgroundColor: '#ECFDF5', 
  },

  [ORDER_TYPES.REPAIR]: {
    label: 'Reparo',
    icon: 'screwdriver-wrench',
    color: '#F59E0B',         
    backgroundColor: '#FEF3C7', 
  },
};
