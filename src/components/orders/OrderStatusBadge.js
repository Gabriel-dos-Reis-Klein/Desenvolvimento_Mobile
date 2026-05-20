import { View, StyleSheet } from 'react-native';

import {
  ORDER_STATUS_COLORS,
} from '../../constants/order-status';

export default function OrderStatusBadge({
  status,
}) {
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor:
            ORDER_STATUS_COLORS[status] ||
            '#E0E0E0',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFF',
  },
});