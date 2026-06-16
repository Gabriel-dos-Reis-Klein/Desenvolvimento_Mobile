import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import {
  COLORS,
  SPACING,
  RADIUS,
  TYPOGRAPHY,
  FONT_FAMILY,
} from '../../theme';

export default function CustomerCard({
  customer,
  onPress,
  highlightQuery = '',
  style,
  ...props
}) {
  const firstLetter =
    customer?.nome?.charAt(0)?.toUpperCase() || '?';

  const normalize = (text = '') => text.toString();

  const renderHighlighted = (text = '') => {
    if (!highlightQuery.trim()) {
      return <Text>{text}</Text>;
    }

    const regex = new RegExp(`(${highlightQuery})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const isMatch =
        part.toLowerCase() === highlightQuery.toLowerCase();

      return (
        <Text
          key={index}
          style={isMatch ? styles.highlight : styles.normalText}
        >
          {part}
        </Text>
      );
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.8}
      {...props}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{firstLetter}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {renderHighlighted(customer.nome)}
        </Text>

        <Text style={styles.phone}>
          {renderHighlighted(customer.telefone)}
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
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary10,
  },

  avatarText: {
    ...TYPOGRAPHY.body,
    fontFamily: FONT_FAMILY.robotoBold,
    color: COLORS.primary,
    fontSize: 20,
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
    color: COLORS.textSecondary,
  },

  normalText: {
    color: COLORS.text,
  },

  highlight: {
    color: COLORS.primary,
    backgroundColor: COLORS.primary10,
    fontWeight: '700',
    borderRadius: 4,
  },
});