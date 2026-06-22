import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import Input from '../common/Input';

import {
  COLORS,
  SPACING,
  FONT_FAMILY,
} from '../../theme';

export default function DateSelectorRow({
  label,
  dateValue,
  onOpenDate,
  onOpenTime,

  hasToggle,
  isToggled,
  onToggle,

  toggleTextOn,
  toggleTextOff,

  error,
}) {
  const formatDateOnly = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('pt-BR');
  };

  const formatTimeOnly = (date) => {
    if (!date) return '';

    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderFields = () => (
    <>
      <View style={styles.dateTimeRow}>
        <Pressable
          style={styles.flexField}
          onPress={onOpenDate}
        >
          <View pointerEvents="none">
            <Input
              label={label}
              value={formatDateOnly(dateValue)}
              editable={false}
              error={error}
            />
          </View>
        </Pressable>

        <Pressable
          style={styles.flexField}
          onPress={onOpenTime}
        >
          <View pointerEvents="none">
            <Input
              label="Horário"
              value={formatTimeOnly(dateValue)}
              editable={false}
              placeholder="00:00"
              error={error}
            />
          </View>
        </Pressable>
      </View>

      {!!error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </>
  );

  if (hasToggle) {
    return (
      <View style={styles.container}>
        <Pressable
          style={styles.accordionTrigger}
          onPress={onToggle}
        >
          <Text style={styles.triggerText}>
            {isToggled
              ? toggleTextOn
              : toggleTextOff}
          </Text>
        </Pressable>

        {isToggled && renderFields()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderFields()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xs,
  },

  dateTimeRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },

  flexField: {
    flex: 1,
  },

  accordionTrigger: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },

  triggerText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.poppinsMedium,
    color: COLORS.primary,
  },

  errorText: {
    marginTop: -4,
    fontSize: 12,
    color: COLORS.error || '#D32F2F',
    fontFamily: FONT_FAMILY.poppinsMedium,
  },
});