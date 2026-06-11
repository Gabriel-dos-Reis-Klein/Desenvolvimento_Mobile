import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Text
  from '../common/Text';

import OrderIcon
  from './OrderIcon';

import OrderStatusBadge
  from './OrderStatusBadge';

import {
  COLORS,
  SPACING,
  RADIUS,
  TYPOGRAPHY,
  FONT_FAMILY,
} from '../../theme';
import { ORDER_STATUS_LABELS, ORDER_TYPE_LABELS } from '../../constants';

export default function OrderCard({
  order,
  navigation,
  onPress,
  style,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      {...props}
    >
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <OrderIcon
            type={order.tipoPedido}
          />
        </View>

        <OrderStatusBadge
          status={order.statusPedido}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text
          variant="body"
          numberOfLines={1}
          style={styles.title}
        >
          {order.titulo}
        </Text>

        <Text
          variant="small"
          color={COLORS.textSecondary}
          style={styles.subtitle}
        >
          {`${ORDER_TYPE_LABELS[order.tipoPedido]} • ${ORDER_STATUS_LABELS[order.statusPedido]}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: SPACING.lg,
  },

  iconContainer: {
    position: 'relative',
  },

  iconCircle: {
    width: 55,
    height: 55,

    borderRadius: RADIUS.lg,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor:
      COLORS.surfaceSecondary,
  },

  contentContainer: {
    flex: 1,

    marginLeft: SPACING.md,
  },

  title: {
    ...TYPOGRAPHY.body,

    fontFamily:
      FONT_FAMILY.poppinsSemiBold,

    color: COLORS.text,
  },

  subtitle: {
    marginTop: SPACING.xs,
  },
});
