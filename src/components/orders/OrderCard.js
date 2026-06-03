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
      onPress={() => navigation.navigate('Details')}
      activeOpacity={0.8}
      {...props}
    >
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <OrderIcon
            type={order.tipoServico}
          />
        </View>

        <OrderStatusBadge
          status={order.status}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text
          variant="body"
          numberOfLines={1}
          style={styles.title}
        >
          {order.descricaoPeca}
        </Text>

        <Text
          variant="small"
          color={COLORS.textSecondary}
          style={styles.subtitle}
        >
          {`${order.tipoServico} • ${order.status}`}
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