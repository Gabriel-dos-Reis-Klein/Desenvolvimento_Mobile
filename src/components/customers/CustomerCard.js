import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import {
  COLORS,
  SPACING,
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
      activeOpacity={0.7}
      {...props}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{firstLetter}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {renderHighlighted(customer?.nome)}
        </Text>

        <Text style={styles.phone}>
          {renderHighlighted(customer?.telefone)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md || 12,
    marginBottom: SPACING.xs || 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },

  avatar: {
    width: 48, 
    height: 48,
    borderRadius: 48 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSecondary || '#f1f3f5',
  },

  avatarText: {
    ...TYPOGRAPHY.body,
    fontFamily: FONT_FAMILY.robotoBold,
    color: '#6750A4',
    fontSize: 18,
  },

  content: {
    flex: 1,
    marginLeft: SPACING.md || 12,
  },

  name: {
    ...TYPOGRAPHY.body,
    fontFamily: FONT_FAMILY.robotoBold,
    color: COLORS.text,
  },

  phone: {
    marginTop: 2,
    fontSize: 13,
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