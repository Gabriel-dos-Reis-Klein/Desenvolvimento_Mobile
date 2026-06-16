import {
  View,
  StyleSheet,
} from 'react-native';

import Text from './Text';

import {
  COLORS,
  FONT_FAMILY,
  SPACING,
} from '../../themes';

export default function ListHeader({
  title,
  total,
  style,
  ...props
}) {
  return (
    <View
      style={[
        styles.container,
        style,
      ]}
      {...props}
    >
      <Text
        variant="h1"
        style={styles.title}
      >
        {title}
      </Text>

      <Text
        variant="small"
        color={COLORS.textSecondary}
        style={styles.subtitle}
      >
        {total} resultado
        {total !== 1 ? 's' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    paddingTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },

  title: {
    fontFamily:
      FONT_FAMILY.poppinsBold,
  },

  subtitle: {
    marginTop: SPACING.xs,
  },
});