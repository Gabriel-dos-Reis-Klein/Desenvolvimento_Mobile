import {
  View,
  StyleSheet,
} from 'react-native';

import Text from '../common/Text';

import {
  COLORS,
  SPACING,
  FONT_FAMILY,
} from '../../theme';

export default function OrderSection({
  title,
  children,
}) {
  return (
    <View style={styles.container}>
      <Text
        variant="body"
        style={styles.title}
      >
        {title}
      </Text>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },

  title: {
    marginBottom: SPACING.md,

    color: COLORS.text,

    fontFamily:
      FONT_FAMILY.robotoBold,
  },
});