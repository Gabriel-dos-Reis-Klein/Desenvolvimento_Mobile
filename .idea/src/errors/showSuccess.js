import {
  Alert,
  Platform,
} from 'react-native';

export function showSuccess(
  message,
  onPress,
) {
  if (Platform.OS === 'web') {
    window.alert(message);

    if (onPress) {
      onPress();
    }

    return;
  }

  Alert.alert(
    'Sucesso',
    message,
    [
      {
        text: 'OK',
        onPress,
      },
    ]
  );
}