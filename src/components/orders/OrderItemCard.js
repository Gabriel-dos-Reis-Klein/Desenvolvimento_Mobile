import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Card, Text, Badge, Menu, Divider } from 'react-native-paper';
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

export default function OrderItemCard({ item = {}, onEdit, onDelete, onDuplicate }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const currentType = item?.tipo ? String(item.tipo).toUpperCase() : 'CONFECCAO';
  
  const typeStyle = ORDER_TYPE_STYLES?.[currentType] || {
    label: 'Confecção',
    icon: 'shirt',
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
  };

  const typeLabel = typeStyle?.label || FALLBACK_LABELS[currentType] || 'Confecção';

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // Componente interno para garantir o alinhamento e centralização perfeita dos ícones do Menu
  const renderMenuIcon = (iconName, iconColor) => (
    <View style={styles.menuIconContainer}>
      <FontAwesome6 name={iconName} size={12} color={iconColor} />
    </View>
  );

  return (
    <Card 
      style={styles.card} 
      mode="flat" // Volta ao modo flat da versão anterior
      elevation={0}
      onPress={onEdit}
    >
      <Card.Content style={styles.cardContent}>
        
        {/* HEADER */}
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

        {/* DATAS */}
        <View style={styles.datesGrid}>
          {!!item?.dataProva && (
            <View style={styles.dateBadge}>
              <FontAwesome6 name="scissors" size={10} color="#6B7280" />
              <Text style={styles.dateText}>Prova: <Text style={styles.dateValueBold}>{formatDate(item.dataProva)}</Text></Text>
            </View>
          )}
          {!!item?.dataPrazo && (
            <View style={styles.dateBadge}>
              <FontAwesome6 name="calendar" size={10} color="#6B7280" />
              <Text style={styles.dateText}>Prazo: <Text style={styles.dateValueBold}>{formatDate(item.dataPrazo)}</Text></Text>
            </View>
          )}
          {!!item?.dataEntrega && (
            <View style={styles.dateBadge}>
              <FontAwesome6 name="truck" size={10} color="#10B981" />
              <Text style={[styles.dateText, { color: '#047857' }]}>Entrega: {formatDate(item.dataEntrega)}</Text>
            </View>
          )}
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Valor do item</Text>
            {/* COR DO PREÇO: Retornou para COLORS.text da versão antiga */}
            <Text style={styles.priceValue}>{formatCurrency(item?.valor)}</Text>
          </View>

          <View style={styles.actionsContainer}>
            {/* CONTADOR DE IMAGENS */}
            {!!item?.imagem?.length && item.imagem[0] !== "string" && (
              <View style={styles.imageBadgeContainer}>
                <FontAwesome6 name="image" size={14} color={COLORS.textSecondary || '#4B5563'} />
                <Badge size={16} style={styles.imageBadge}>
                  {item.imagem.length}
                </Badge>
              </View>
            )}

            {/* GATILHO DO MENU TRÊS PONTOS */}
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchorPosition="bottom"
              contentStyle={styles.menuContent}
              anchor={
                <TouchableOpacity style={styles.threeDotsButton} onPress={openMenu}>
                  <FontAwesome6 name="ellipsis-vertical" size={14} color="#4B5563" />
                </TouchableOpacity>
              }
            >
              <Menu.Item 
                leadingIcon={() => renderMenuIcon("pen", COLORS.text || '#1F2937')}
                onPress={() => { closeMenu(); onEdit(); }} 
                title="Editar"
                titleStyle={styles.menuItemText}
              />
              <Menu.Item 
                leadingIcon={() => renderMenuIcon("copy", COLORS.text || '#1F2937')}
                onPress={() => { closeMenu(); onDuplicate(); }} 
                title="Duplicar"
                titleStyle={styles.menuItemText}
              />
              <Divider style={styles.menuDivider} />
              <Menu.Item 
                leadingIcon={() => renderMenuIcon("trash", "#EF4444")}
                onPress={() => { closeMenu(); onDelete(); }} 
                title="Excluir"
                titleStyle={[styles.menuItemText, styles.deleteItemText]}
              />
            </Menu>
          </View>
        </View>

      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16, 
    marginBottom: SPACING.md,
    // ESTILO DA BORDA ANTIGA: Retornou para a linha contínua sutil sem sombras pesadas
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)', 
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
    fontFamily: FONT_FAMILY.robotoMedium || 'System',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  typeChip: { 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 5, 
    paddingHorizontal: 8,
    paddingVertical: 4, 
    borderRadius: RADIUS.full || 99,
  },
  typeText: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.poppinsSemiBold || 'System',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  datesGrid: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  dateText: { 
    fontSize: 11, 
    fontFamily: FONT_FAMILY.robotoRegular || 'System',
    color: '#4B5563',
  },
  dateValueBold: {
    fontWeight: '600',
    color: '#1F2937',
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  priceContainer: {
    gap: 1,
  },
  priceLabel: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.poppinsMedium || 'System',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceValue: { 
    fontFamily: FONT_FAMILY.robotoBold|| 'System', 
    fontSize: 16,
    color: COLORS.text || '#1F2937',
  },
  actionsContainer: { 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 4,
  },
  threeDotsButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBadgeContainer: {
    position: 'relative',
    marginRight: 4,
    padding: 4,
  },
  imageBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: COLORS.primary,
    color: '#FFFFFF',
    fontSize: 9,
  },
  menuIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    backgroundColor: COLORS.surface || '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  menuItemText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.poppinsMedium || 'System',
    color: COLORS.text || '#1F2937',
  },
  deleteItemText: {
    color: '#EF4444',
  },
  menuDivider: {
    marginVertical: 4,
    backgroundColor: '#E5E7EB',
  },
});