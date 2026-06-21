import React from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Text from '../common/Text';
import OrderItemCard from './OrderItemCard';
import OrderSection from './OrderSection';
import { COLORS, SPACING } from '../../theme';

export default function OrderItemsListSection({ 
  items, 
  onEditItem, 
  onDeleteItem, 
  onDuplicateItem, 
  onAddItem 
}) {
  return (
    <OrderSection title={`Itens (${items.length})`}>
      {items.map((item, index) => (
        <OrderItemCard
          key={item.id || `item_${index}_${item.titulo}`} 
          item={item}
          onEdit={() => onEditItem(item, index)}
          onDelete={() => onDeleteItem(index)}
          onDuplicate={() => onDuplicateItem(item, index)} 
        />
      ))}

      {/* TROCADO PARA PRESSABLE PARA MELHORAR O FEEDBACK */}
      <Pressable 
        onPress={onAddItem}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.05)', borderless: false }}
        style={({ pressed }) => [
          styles.dashedButton,
          pressed && styles.dashedButtonPressed
        ]}
      >
        <FontAwesome6 name="plus" size={14} color={COLORS.primary} />
        <Text style={styles.dashedButtonText}>Adicionar Item</Text>
      </Pressable>
    </OrderSection>
  );
}

const styles = StyleSheet.create({
  dashedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.primary30 || 'rgba(255, 0, 84, 0.3)',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: SPACING.sm,
    // Garante que o efeito ripple do Android respeite as bordas arredondadas do botão
    overflow: 'hidden', 
    // Transição suave de escala
    transform: [{ scale: 1 }], 
  },
  // ESTILO DE CLIQUE: Diminui levemente o tamanho dando profundidade física
  dashedButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
    backgroundColor: 'rgba(0, 0, 0, 0.02)', // sutil escurecida ao tocar no iOS
  },
  dashedButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
});