import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, IconButton } from 'react-native-paper';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { 
  COLORS, 
  SPACING, 
  RADIUS, 
  FONT_FAMILY, 
  ORDER_TYPE_STYLES 
} from '../../theme';

const FALLBACK_LABELS = {
  CONFECCAO: 'Confecção',
  REPARO: 'Reparo',
  MODIFICACAO: 'Modificação',
};

const formatCurrency = (value) => {
  if (value === undefined || value === null) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value));
};

const formatDate = (date) => {
  if (!date) return '';
  try {
    return new Date(date).toLocaleDateString('pt-BR');
  } catch {
    return '';
  }
};

export default function OrderItemCard({ item = {}, onEdit, onDelete }) {
  const currentType = item?.tipo ? String(item.tipo).toUpperCase() : 'CONFECCAO';
  
  const typeStyle = ORDER_TYPE_STYLES?.[currentType] || {
    label: 'Confecção',
    icon: 'shirt',
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
  };

  const typeLabel = typeStyle?.label || FALLBACK_LABELS[currentType] || 'Confecção';

  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content style={styles.cardContent}>
        
        {/* CABEÇALHO COM TÍTULO E CHIP DE TIPO */}
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.title}>
            {item?.titulo || 'Sem Título'}
          </Text>
          
          <View style={[styles.typeChip, { backgroundColor: typeStyle?.backgroundColor }]}>
            <FontAwesome6 name={typeStyle?.icon || 'shirt'} size={10} color={typeStyle?.color} />
            <Text style={[styles.typeText, { color: typeStyle?.color }]}>
              {typeLabel}
            </Text>
          </View>
        </View>

        {/* DATAS IMPORTANTES (GRID ATUALIZADO SEMPRE LOGO ABAIXO DO TÍTULO) */}
        <View style={styles.datesGrid}>
          {!!item?.dataProva && (
            <View style={styles.dateBadge}>
              <FontAwesome6 name="location-dot" size={11} color={COLORS.textSecondary} />
              <Text style={styles.dateText}>Prova: {formatDate(item.dataProva)}</Text>
            </View>
          )}
          {!!item?.dataPrazo && (
            <View style={styles.dateBadge}>
              <FontAwesome6 name="clock" size={11} color={COLORS.textSecondary} />
              <Text style={styles.dateText}>Prazo: {formatDate(item.dataPrazo)}</Text>
            </View>
          )}
          {!!item?.dataEntrega && (
            <View style={styles.dateBadge}>
              <FontAwesome6 name="truck" size={11} color={COLORS.textSecondary} />
              <Text style={styles.dateText}>Entrega: {formatDate(item.dataEntrega)}</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Valor Total</Text>
            <Text style={styles.priceValue}>{formatCurrency(item?.valor)}</Text>
          </View>

          <View style={styles.actionsContainer}>
            {!!item?.imagem?.length && item.imagem[0] !== "string" && (
              <View style={styles.imageBadgeContainer}>
                <FontAwesome6 name="image" size={14} color={COLORS.textSecondary} />
                <Badge size={16} style={styles.imageBadge}>
                  {item.imagem.length}
                </Badge>
              </View>
            )}

            <IconButton
              icon={() => <FontAwesome6 name="pen" size={12} color={COLORS.textSecondary} />}
              mode="contained-tonal"
              size={20}
              containerColor={COLORS.black05}
              onPress={onEdit}
            />

            <IconButton
              icon={() => <FontAwesome6 name="xmark" size={13} color={COLORS.primary} />}
              mode="contained-tonal"
              size={20}
              containerColor={COLORS.primary10}
              onPress={onDelete}
            />
          </View>
        </View>

      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
  },
  cardContent: {
    padding: SPACING.md,
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  title: { 
    flex: 1, 
    fontFamily: FONT_FAMILY.poppinsBold,
    fontSize: 16,
    color: COLORS.text,
  },
  typeChip: { 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 4, 
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4, 
    borderRadius: RADIUS.full,
  },
  typeText: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.poppinsSemiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  datesGrid: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.surfaceSecondary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateText: { 
    fontSize: 12, 
    fontFamily: FONT_FAMILY.robotoRegular,
    color: COLORS.textSecondary,
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  priceContainer: {
    gap: 2,
  },
  priceLabel: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.poppinsMedium,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  priceValue: { 
    fontFamily: FONT_FAMILY.poppinsBold, 
    fontSize: 18,
    color: COLORS.primary, 
  },
  actionsContainer: { 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: SPACING.xs,
  },
  imageBadgeContainer: {
    position: 'relative',
    marginRight: SPACING.sm,
    padding: 4,
  },
  imageBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontFamily: FONT_FAMILY.robotoBold,
    fontSize: 9,
  },
});
