import {
  Provider as PaperProvider,
} from 'react-native-paper';

import AppNavigator
  from './navigation';

import {
  useAppFonts,
} from './hooks/useAppFonts';

// TODO: criar contramedidas para caso a API esteja indisponível
export default function App() {

  useAppFonts();

  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}