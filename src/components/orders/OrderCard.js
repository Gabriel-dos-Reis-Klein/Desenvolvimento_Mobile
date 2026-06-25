import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Text from '../common/Text';

import OrderIcon from './OrderIcon';

import {
  COLORS,
  SPACING,
  RADIUS,
  TYPOGRAPHY,
  FONT_FAMILY,
} from '../../theme';

export default function OrderCard({
  order,
  navigation,
  onPress,
  highlightQuery = '',
  style,
  ...props
}) {
  if (!order) return null;

  const renderHighlighted = (text = '', baseStyle = {}) => {
    if (!text) return null;
    
    if (!highlightQuery.trim()) {
      return <Text style={baseStyle}>{text}</Text>;
    }

    const regex = new RegExp(`(${highlightQuery})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const isMatch = part.toLowerCase() === highlightQuery.toLowerCase();
      return (
        <Text
          key={index}
          style={[baseStyle, isMatch ? styles.highlight : null]}
        >
          {part}
        </Text>
      );
    });
  };


  const getProximoPrazo = () => {
    if (!order?.itens || order?.itens.length === 0) return null;

    const datasValidas = order.itens
      .map(item => item?.dataPrazo)
      .filter(data => data != null)
      .map(data => new Date(data));

    if (datasValidas.length === 0) return null;

    const dataMaisProxima = new Date(Math.min(...datasValidas));
    
    return dataMaisProxima.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  const prazoMaisProximo = getProximoPrazo();

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      <View style={styles.mainRow}>
        <View style={styles.iconCircle}>
          <OrderIcon status={order?.statusPedido} size={24} />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <View style={styles.titleWrapper}>
              <Text variant="body" numberOfLines={1} style={styles.title}>
                {renderHighlighted(order?.titulo, styles.title)}
              </Text>
            </View>
          </View>

          <View style={styles.footerRow}>
            <View style={styles.clientNameWrapper}>
              <Text variant="small" style={styles.clientName} numberOfLines={1}>
                {
                  renderHighlighted(
                    order?.nomeCliente || 'Cliente não informado', 
                    styles.clientName
                  )
                }
              </Text>
            </View>
            
            <View style={styles.rightBadgesGroup}>
              <View style={styles.countBadge}>
                <Text variant="small" style={styles.countText}>
                  {order?.quantidade || order?.itens?.length || 0} {order?.quantidade === 1 ? 'item' : 'itens'}
                </Text>
              </View>

              {prazoMaisProximo && (
                <View style={styles.deadlineBadge}>
                  <MaterialCommunityIcons name="calendar-clock" size={12} color={COLORS.primary || '#007aff'} />
                  <Text variant="small" style={styles.deadlineText}>
                    {prazoMaisProximo}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: SPACING.md || 12,
    marginBottom: SPACING.xs || 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md || 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSecondary || '#f1f3f5',
  },
  contentContainer: {
    flex: 1,
    marginLeft: SPACING.md || 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleWrapper: {
    flex: 1,
    marginRight: SPACING.sm || 8,
  },
  title: {
    ...TYPOGRAPHY.body,
    fontFamily: FONT_FAMILY.robotoBold,
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs || 6,
  },
  clientNameWrapper: {
    flex: 1,
    marginRight: SPACING.sm || 8,
  },
  clientName: {
    fontSize: 13,
    color: '#495057',
    fontWeight: '500',
  },
  rightBadgesGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  countBadge: {
    backgroundColor: '#f1f3f5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  countText: {
    fontSize: 11,
    color: '#495057',
    fontWeight: '600',
  },
  deadlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSecondary || '#e3f2fd',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  deadlineText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary || '#007aff',
  },
  highlight: {
    color: COLORS.primary || '#6750A4',
    backgroundColor: COLORS.primary10 || '#f3edf7',
    fontWeight: '700',
  },
});