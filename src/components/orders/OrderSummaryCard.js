import {
  View,
  StyleSheet,
} from 'react-native';

import Text from '../common/Text';

import {
  COLORS,
  SPACING,
  RADIUS,
  FONT_FAMILY,
  TYPOGRAPHY,
} from '../../theme';

export default function OrderSummaryCard({
  total,
  quantity,
  advance = 0,
}) {
  const balance =
    total - advance;

  return (
    <View style={styles.container}>
      <Text
        variant="body"
        style={styles.title}
      >
        Resumo
      </Text>

      <View style={styles.row}>
        <Text color={COLORS.textSecondary}>
          Itens
        </Text>

        <Text>
          {quantity}
        </Text>
      </View>

      <View style={styles.row}>
        <Text
          color={COLORS.textSecondary}
        >
          Orçamento
        </Text>

        <Text
          style={styles.balance}
        >
          R$ {total.toFixed(2)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text color={COLORS.textSecondary}>
          Entrada
        </Text>

        <Text>{ 
            advance > 0 
              ? "- " 
              : ""
          }

          R$ {
            advance.toFixed(2)
          }
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.totalLabel}>
          Saldo
        </Text>

        <Text
          style={styles.total}
        >
          R$ {balance.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      backgroundColor:
        COLORS.surface,

      borderRadius:
        RADIUS.lg,

      padding:
        SPACING.lg,

      borderWidth: 1,
      borderColor:
        COLORS.border,

      marginBottom:
        SPACING.xl,
    },

    title: {
      marginBottom:
        SPACING.md,

      fontFamily:
        FONT_FAMILY.robotoBold,
    },

    row: {
      flexDirection: 'row',

      justifyContent:
        'space-between',

      marginBottom:
        SPACING.sm,

      alignItems:
        'center',
    },

    divider: {
      height: 1,

      backgroundColor:
        COLORS.border,

      marginVertical:
        SPACING.md,
    },

    totalLabel: {
      fontFamily:
        FONT_FAMILY.robotoBold,
    },

    total: {
      ...TYPOGRAPHY.h2,

      color:
        COLORS.primary,
    },

    balance: {
      fontFamily:
        FONT_FAMILY.robotoBold,
    },
  });