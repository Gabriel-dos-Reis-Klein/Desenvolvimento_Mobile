import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Text from './Text';

import {
  COLORS,
  RADIUS,
  FONT_FAMILY,
} from '../../theme';

export default function Button({
  title,
  onPress,
  loading,
  disabled,
  variant = 'primary',
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled &&
          styles.disabled,
      ]}
      onPress={onPress}
      disabled={
        disabled || loading
      }
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          styles[
            `${variant}Text`
          ],
        ]}
      >
        {loading
          ? 'Carregando...'
          : title}
      </Text>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    button: {
      height: 52,

      borderRadius:
        RADIUS.lg,

      justifyContent:
        'center',

      alignItems:
        'center',
    },

    text: {
      fontFamily:
        FONT_FAMILY.robotoBold,

      fontSize: 16,
    },

    primary: {
      backgroundColor:
        COLORS.primary,
    },

    secondary: {
      backgroundColor: COLORS.surfaceSecondary,

      borderWidth: 1,
      borderColor: COLORS.border,
    },

    secondaryText: {
      color: COLORS.black70,
    },

    primaryText: {
      color: COLORS.white,
    },

    disabled: {
      opacity: 0.5,
    },
  });