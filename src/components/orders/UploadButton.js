import { useState } from 'react';
import { Pressable, View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { COLORS, FONT_FAMILY } from '../../theme';

export default function UploadButton({ onPress, isLoading = false }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={styles.buttonContainer}>
      <Pressable 
        onPress={isLoading ? null : onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        android_ripple={{ 
          color: COLORS.primary10 || 'rgba(255, 0, 84, 0.1)', 
          borderless: false 
        }}
        style={[
          styles.uploadButton,
          isPressed && styles.uploadButtonPressed
        ]}
      >
        <View style={[
          styles.iconCircle,
          isPressed && styles.iconCirclePressed
        ]}>
          {isLoading ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <FontAwesome6 name="cloud-arrow-up" size={22} color={COLORS.primary} />
          )}
        </View>
        
        <Text style={styles.uploadTitle}>
          {isLoading ? 'Carregando arquivos...' : 'Adicionar arquivos'}
        </Text>
        <Text style={styles.uploadSubtitle}>
          {isLoading ? 'Por favor, aguarde' : 'PNG ou JPG de até 10MB'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
  },
  uploadButton: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.primary30 || 'rgba(255, 0, 84, 0.3)',
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonPressed: {
    borderColor: COLORS.primary || '#FF0054', 
    backgroundColor: COLORS.primary10 || 'rgba(255, 0, 84, 0.05)',
    ...Platform.select({
      ios: {
        transform: [{ scale: 0.97 }],
      }
    })
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary10 || 'rgba(255, 0, 84, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconCirclePressed: {
    backgroundColor: 'rgba(255, 0, 84, 0.2)',
  },
  uploadTitle: {
    fontSize: 15,
    fontFamily: FONT_FAMILY?.poppinsSemiBold || 'System',
    color: COLORS.text,
    marginBottom: 2,
  },
  uploadSubtitle: {
    fontSize: 12,
    fontFamily: FONT_FAMILY?.poppinsRegular || 'System',
    color: COLORS.textSecondary || '#6C757D',
  },
});