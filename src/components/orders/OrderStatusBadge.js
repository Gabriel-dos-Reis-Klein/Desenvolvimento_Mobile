import { View, StyleSheet } from 'react-native';

import {
  STATUS_COLORS,
} from '../../theme';

export default function OrderStatusBadge({
  status,
}) {
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor:
            STATUS_COLORS[status] ||
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