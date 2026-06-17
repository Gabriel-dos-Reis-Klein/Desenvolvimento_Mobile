import {
  View,
  StyleSheet,
} from 'react-native';

import Text from '../common/Text';

import {
  COLORS,
  SPACING,
  RADIUS,
  SHADOWS,
  FONT_FAMILY,
} from '../../theme';

export default function OrderItemCard({
  item,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text
          variant="body"
          style={styles.title}
        >
          {item.titulo}
        </Text>

        {!!item.descricao && (
          <Text
            variant="small"
            color={
              COLORS.textSecondary
            }
          >
            {item.descricao}
          </Text>
        )}

        <Text
          variant="small"
          color={
            COLORS.textSecondary
          }
        >
          {item.tipo}
        </Text>
      </View>

      <Text style={styles.price}>
        R$ {item.valor}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems: 'center',

      padding:
        SPACING.md,

      backgroundColor:
        COLORS.surface,

      borderRadius:
        RADIUS.lg,

      borderWidth: 1,
      borderColor:
        COLORS.border,

      marginBottom:
        SPACING.md,

    },

    content: {
      flex: 1,
    },

    title: {
      fontFamily:
        FONT_FAMILY.robotoBold,
    },

    price: {
      color:
        COLORS.primary,

      fontFamily:
        FONT_FAMILY.robotoBold,
    },
  });