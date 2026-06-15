import {
  Alert,
} from 'react-native';

export function showSuccess(
  message,
  onPress,
) {
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