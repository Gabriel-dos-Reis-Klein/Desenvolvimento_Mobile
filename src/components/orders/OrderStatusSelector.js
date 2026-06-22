import { useEffect } from 'react'; 
import { View, StyleSheet, Platform } from 'react-native';
import { Chip } from 'react-native-paper';
import { useAudioPlayer } from 'expo-audio';
import OrderSection from './OrderSection';
import { COLORS, RADIUS, SPACING } from '../../theme';

const doneSoundAsset = require('../../assets/sounds/done.mp3');

export default function OrderStatusSelector({ value, onChange }) {
  const player = useAudioPlayer(doneSoundAsset);

  useEffect(() => {
    if (!value && onChange) {
      onChange('PENDENTE');
    }
  }, [value, onChange]);

  const playSuccessSound = () => {
    try {
      if (player) {
        player.seekTo(0);
        player.play();
      }
    } catch (error) {
      console.warn('Erro ao reproduzir áudio:', error);
    }
  };

  const handleStatusChange = (statusId) => {
    if (statusId === 'CONCLUIDO' && value !== 'CONCLUIDO') {
      playSuccessSound();
    }
    if (onChange) {
      onChange(statusId);
    }
  };

  const OPTIONS = [
    { id: 'PENDENTE', label: 'Pendente', icon: 'clock-outline' },
    { id: 'EXECUTANDO', label: 'Executando', icon: 'progress-wrench' },
    { id: 'CONCLUIDO', label: 'Concluído', icon: 'check-circle-outline' },
  ];

  return (
    <OrderSection title="Status do Pedido">
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
              onPress={isEditable ? () => handleStatusChange(option.id) : undefined}
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
    color: COLORS.primary,
    fontWeight: '600',
  },
});