import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../theme';

export default function OrderIcon({
  status,
  size = 24,
  color = '#6750A4', // 💜 Violeta padrão do React Native Paper (MD3 Primary)
  style,
  ...props
}) {
  const getStatusIcon = () => {
    switch (status) {
      case 'PENDENTE':
        return 'clock-outline';
      case 'EXECUTANDO':
        return 'progress-wrench';
      case 'CONCLUIDO':
        return 'check-circle-outline';
      default:
        return 'help-circle-outline';
    }
  };

  return (
    <MaterialCommunityIcons
      name={getStatusIcon()}
      size={size}
      color={color}
      style={style}
      {...props}
    />  
  );
}