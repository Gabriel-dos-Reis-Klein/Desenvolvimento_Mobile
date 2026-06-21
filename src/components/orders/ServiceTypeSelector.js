import { useEffect } from 'react'; 
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

import {
  COLORS,
  RADIUS,
  SPACING,
} from '../../theme';

export default function ServiceTypeSelector({ value, onChange }) {
  
  useEffect(() => {
    if (!value) {
      onChange('CONFECCAO');
    }
  }, [value]);

  const OPTIONS = [
    { id: 'CONFECCAO', label: 'Confecção', icon: 'hanger' }, // ou 'needle' / 'hanger'
    { id: 'REPARO', label: 'Reparo', icon: 'wrench' },
    { id: 'MODIFICACAO', label: 'Modif.', icon: 'content-cut' },
  ];

  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => {
        const isSelected = value === option.id;

        return (
          <Chip
            key={option.id}
            icon={option.icon}
            selected={isSelected} 
            showSelectedOverlay={false}
            mode='outlined'
            onPress={() => onChange(option.id)}
            selectedColor={isSelected ? COLORS.primary : COLORS.text}
            style={[
              styles.chip,
              isSelected && styles.chipSelected
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    flexWrap: 'wrap',     
    gap: SPACING.sm,      
    marginVertical: SPACING.xs,
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
  chipText: {
    fontSize: 14,
    color: COLORS.text,
  },
  chipTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});