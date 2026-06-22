import { 
  StyleSheet, 
  Pressable 
} from 'react-native';

import FontAwesome6 
  from 'react-native-vector-icons/FontAwesome6';

import Text 
  from '../common/Text';

import OrderItemCard 
  from './OrderItemCard';

import OrderSection 
  from './OrderSection';

import { 
  COLORS, 
  SPACING 
} from '../../theme';

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
          onEdit={onEditItem ? () => onEditItem(item, index) : undefined}
          onDelete={onDeleteItem ? () => onDeleteItem(item, index) : undefined}
          onDuplicate={onDuplicateItem ? () => onDuplicateItem(item, index) : undefined} 
        />
      ))}

      {!!onAddItem && (
        <Pressable 
          onPress={onAddItem}
          android_ripple={{ 
            color: COLORS.primary10 || 'rgba(255, 0, 84, 0.1)', 
            borderless: false 
          }}
          style={({ pressed }) => [
            styles.dashedButton,
            pressed && styles.dashedButtonPressed
          ]}
        >
          <FontAwesome6 name="plus" size={14} color={COLORS.primary} />
          <Text style={styles.dashedButtonText}>Adicionar Item</Text>
        </Pressable>
      )}
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
    overflow: 'hidden',
  },
  dashedButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
    backgroundColor: COLORS.primary10 || 'rgba(255, 0, 84, 0.05)',
  },
  dashedButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
});