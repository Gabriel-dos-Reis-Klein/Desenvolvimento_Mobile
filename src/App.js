import {
  Provider as PaperProvider,
} from 'react-native-paper';

import AppNavigator
  from './src/navigation';

import {
  useAppFonts,
} from './src/hooks';

import { SafeAreaProvider } 
  from 'react-native-safe-area-context';

import { AuthProvider } 
  from './src/contexts/AuthContext';

// TODO: criar contramedidas para caso a API esteja indisponível
export default function App() {

  useAppFonts();

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