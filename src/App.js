import { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import LottieView from 'lottie-react-native';

import AppNavigator from './navigation';
import { useAppFonts } from './hooks';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  useAppFonts();
  
  const [appIsReady, setAppIsReady] = useState(false);
  const [selectedSplash, setSelectedSplash] = useState(null);

  useEffect(() => {
    async function prepareApp() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      
      const randomNumber = Math.floor(Math.random() * 3) + 1;
      setSelectedSplash(randomNumber);

      await new Promise(resolve => setTimeout(resolve, 4000)); 
      
      setAppIsReady(true);
    }
    
    prepareApp();
  }, []);

  const getSplashSource = () => {
    switch (selectedSplash) {
      case 1: return require('./assets/animations/splash-1.json');
      case 2: return require('./assets/animations/splash-2.json');
      case 3: return require('./assets/animations/splash-3.json');
      default: return require('./assets/animations/splash-1.json');
    }
  };

  if (!appIsReady || selectedSplash === null) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {selectedSplash !== null && (
          <LottieView
            source={getSplashSource()}
            autoPlay
            loop={true}
            style={styles.lottieAnimation}
            resizeMode="contain"
          />
        )}
      </View>
    );
  }

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

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  lottieAnimation: {
    width: 300,
    height: 300,
  },
});