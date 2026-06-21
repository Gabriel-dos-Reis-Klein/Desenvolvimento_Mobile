import { Pressable, StyleSheet, ActivityIndicator, Text } from 'react-native';
import * as Haptics from 'expo-haptics'; // IMPORTAÇÃO DO EXPO HAPTICS
import { COLORS } from '../../theme'; 

export default function Button({ title, onPress, variant = 'primary', loading, disabled }) {
  
  // Função interna para interceptar o clique e acionar a vibração
  const handlePress = async () => {
    if (variant === 'primary') {
      // Dispara o feedback de impacto leve apenas no botão primário
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {
        // Silencia falhas caso o dispositivo não tenha suporte a haptics
      });
    }
    
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress} // TROCADO PARA A FUNÇÃO COM HAPTICS
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : COLORS.primary} />
      ) : (
        <Text style={[styles.text, variant === 'primary' ? styles.textPrimary : styles.textSecondary]}>
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
  textSecondary: {
    color: COLORS.textSecondary || '#6C757D',
  },
});