import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import {
  COLORS,
  RADIUS,
  FONT_FAMILY,
  SPACING,
} from '../../theme';

export default function AuthButton({
  title,
  loading,
  style,
  ...props
}) {
  return (
    <Button
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
    </Button>
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