import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Text
  from '../common/Text';

import {
  COLORS,
  SPACING,
  RADIUS,
  TYPOGRAPHY,
  FONT_FAMILY,
} from '../../themes';

export default function CustomerCard({
  customer,
  onPress,
  style,
  ...props
}) {
  const firstLetter =
    customer?.nome
      ?.charAt(0)
      ?.toUpperCase() || '?';

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
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {firstLetter}
        </Text>
      </View>

      <View style={styles.content}>
        <Text
          variant="body"
          numberOfLines={1}
          style={styles.name}
        >
          {customer.nome}
        </Text>

        <Text
          variant="small"
          color={COLORS.textSecondary}
          style={styles.phone}
        >
          {customer.telefone}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: SPACING.sm,

    borderRadius: RADIUS.lg,

    backgroundColor:
      COLORS.surface,

    marginBottom: SPACING.md,
  },

  avatar: {
    width: 55,
    height: 55,

    borderRadius: 55 / 2,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor:
      COLORS.primary10,
  },

  avatarText: {
    ...TYPOGRAPHY.body,
    fontFamily: FONT_FAMILY.robotoBold,
    color: COLORS.primary,
    fontSize:20,
  },

  content: {
    flex: 1,

    marginLeft: SPACING.md,
  },

  name: {
    ...TYPOGRAPHY.body,
    fontFamily: FONT_FAMILY.robotoBold,
    color: COLORS.text,
  },

  phone: {
    marginTop: SPACING.xs,
  },
});