import { useEffect } from 'react'; 
import { View, StyleSheet, Platform } from 'react-native';
import { Chip } from 'react-native-paper';
import OrderSection from './OrderSection';
import { COLORS, RADIUS, SPACING } from '../../theme';

export default function ItemStatusSelector({ value, onChange }) {
  useEffect(() => {
    if (!value && onChange) {
      onChange('PRODUCAO');
    }
  }, [value, onChange]);

  const OPTIONS = [
    { id: 'PRODUCAO', label: 'Produção', icon: 'progress-wrench' },
    { id: 'PRONTO', label: 'Pronto', icon: 'check-circle-outline' },
    { id: 'ENTREGUE', label: 'Entregue', icon: 'package-variant-closed' },
  ];

  return (
    <OrderSection title="Status do Item">
      <View style={styles.container}>
        {OPTIONS.map((option) => {
          const isSelected = value === option.id;
          const isEditable = typeof onChange === 'function';

          return (
            <Chip
              key={option.id}
              icon={option.icon}
              selected={isSelected} 
              showSelectedOverlay={false}
              mode="outlined"
              onPress={isEditable ? () => onChange(option.id) : undefined}
              selectedColor={isSelected ? COLORS.primary : COLORS.text}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
                !isEditable && styles.disabledChip
              ]}
              textStyle={[
                styles.chipText,
                isSelected && styles.chipTextSelected
              ]}
            >
              {option.label}
            </Chip>
          );
        })}
      </View>
    </OrderSection>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    flexWrap: 'wrap',     
    gap: SPACING.sm,      
    marginVertical: SPACING.xs,
    ...Platform.select({
      web: {
        display: 'flex',
      },
    }),
  },
  chip: {
    backgroundColor: COLORS.surfaceSecondary || '#F8F9FA',
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border || '#E9ECEF',
  },
  chipSelected: {
    backgroundColor: COLORS.primaryLight || 'rgba(255, 0, 84, 0.1)', 
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  disabledChip: {
    opacity: 1,
  },
  chipText: {
    fontSize: 14,
    color: COLORS.text,
  },
  chipTextSelected: {
    color: COLORS.black,
    fontWeight: '600',
  },
});