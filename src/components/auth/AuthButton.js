import {
  Button,
} from 'react-native-paper';

import {
  COLORS,
  RADIUS,
  FONT_FAMILY,
  SPACING
} from '../../theme';

import {
  StyleSheet,
} from 'react-native';

export default function AuthButton({
  title,
  style,
  ...props
}) {
  return (
    <Button
      mode="contained"
      buttonColor={COLORS.primary}
      contentStyle={styles.content}
      labelStyle={styles.label}
      style={[
        styles.button,
        style,
      ]}
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