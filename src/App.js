import { useEffect } from 'react';
import {
  Provider as PaperProvider,
} from 'react-native-paper';

import AppNavigator
  from './navigation';

import {
  useAppFonts,
} from './hooks';

import { SafeAreaProvider } 
  from 'react-native-safe-area-context';

import { AuthProvider } 
  from './contexts/AuthContext';

import * as ScreenOrientation 
  from 'expo-screen-orientation';

// TODO: criar contramedidas para caso a API esteja indisponível
export default function App() {

  useAppFonts();

  useEffect(() => {
    async function lockToPortraitSensor() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
    
    lockToPortraitSensor();
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <PaperProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}