import {
  View,
  StyleSheet,
} from 'react-native';

import Text
  from './Text';

import IconButton
  from './IconButton';

import {
  COLORS,
  FONT_FAMILY,
  SPACING,
} from '../../theme';

export default function ListHeader({
  title,
  total,

  onPressSettings,
  onPressSearch,

  style,
  ...props
}) {
  return (
    <View
      style={style}
      {...props}
    >
      <View style={styles.headerButtons}>
        <IconButton
          icon="cog-outline"
          onPress={onPressSettings}
        />

        <IconButton
          icon="magnify"
          onPress={onPressSearch}
        />
      </View>

      <View style={styles.titleArea}>
        <Text
          variant="h1"
          style={styles.title}
        >
          {title}
        </Text>

        <Text
          variant="small"
          color={COLORS.textSecondary}
        >
          {total} resultados
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: SPACING.sm,
  },

  titleArea: {
    alignItems: 'center',

    marginBottom: SPACING.lg,
  },

  title: {
    fontFamily:
      FONT_FAMILY.poppinsBold,
  },
});