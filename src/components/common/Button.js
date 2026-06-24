import { Pressable, StyleSheet, ActivityIndicator, Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING } from '../../theme'; 

export default function Button({ title, onPress, variant = 'primary', loading, disabled, style }) {
  const handlePress = async () => {
    if (variant === 'primary') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    
    if (onPress) {
      onPress();
    }
  };

  const isButtonDisabled = disabled || loading;

  return (
    <Pressable
      onPress={handlePress}
      disabled={isButtonDisabled}
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        isButtonDisabled && styles.disabled,
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : COLORS.primary} />
      ) : (
        <Text 
          style={[
            styles.text, 
            variant === 'primary' ? styles.textPrimary : styles.textSecondary,
            (isButtonDisabled && variant === 'primary') && styles.textPrimaryDisabled
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.black05,
    borderWidth: 1,
    borderColor: COLORS.black10,
  },
  pressed: {
    opacity: 0.75, 
    transform: [{ scale: 0.95 }], 
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textPrimaryDisabled: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: COLORS.textSecondary || '#6C757D',
  },
});