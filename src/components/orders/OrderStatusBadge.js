import {
  View,
  StyleSheet,
} from 'react-native';

import {
  STATUS_COLORS,
  COLORS,
} from '../../theme';

export default function OrderStatusBadge({
  status,
  size = 20,
  style,
  ...props
}) {
  return (
    <View
      style={[
        styles.badge,

        {
          width: size,
          height: size,

          borderRadius: size / 2,

          backgroundColor:
            STATUS_COLORS[status] ||
            COLORS.black20,
        },

        style,
      ]}

      {...props}
    />
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',

    bottom: -2,
    right: -2,

    borderWidth: 2,
    borderColor: COLORS.white,
  },
});