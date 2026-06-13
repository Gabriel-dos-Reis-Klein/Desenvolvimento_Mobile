import {
  Provider as PaperProvider,
} from 'react-native-paper';

import AppNavigator
  from './src/navigation';

import {
  useAppFonts,
} from './src/hooks/useAppFonts';

import { SafeAreaProvider } 
  from 'react-native-safe-area-context';

// TODO: criar contramedidas para caso a API esteja indisponível
export default function App() {

  useAppFonts();

  return (
    <SafeAreaProvider style={{flex:1}}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </SafeAreaProvider>
    
  );
}