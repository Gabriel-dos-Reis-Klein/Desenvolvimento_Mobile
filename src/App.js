import { 
  useEffect 
} from 'react';

import {
  Provider as PaperProvider,
} from 'react-native-paper';

// IMPORTANTE: Importar o NavigationContainer aqui!
import { NavigationContainer } from '@react-navigation/native';

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
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}