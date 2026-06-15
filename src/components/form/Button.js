import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

import {
  COLORS,
  RADIUS,
  FONT_FAMILY,
  SPACING,
} from '../../theme';

export default function Button({
  title,
  loading = false,
  style,
  ...props
}) {
  return (
    <PaperButton
      mode="contained"
      buttonColor={COLORS.primary}
      contentStyle={styles.content}
      labelStyle={styles.label}
      style={[styles.button, style]}
      loading={loading}
      disabled={loading}
      {...props}
    >
      {title}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: RADIUS.md,
    marginTop: SPACING.lg,
  },

  content: {
    height: 52,
  },

  label: {
    fontFamily: FONT_FAMILY.robotoBold,
    fontSize: 16,
  },
});