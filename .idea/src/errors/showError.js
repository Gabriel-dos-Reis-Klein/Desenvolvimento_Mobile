import { ToastAndroid, Platform, Alert } from 'react-native';

export function showError(error) {
  const message = error?.message || 'Erro inesperado';

  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    Alert.alert('Erro', message);
  }
}