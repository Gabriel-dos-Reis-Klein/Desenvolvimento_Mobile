import * as React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import MainTab from "./components/common/MainTab"

const Stack = createStackNavigator();

export default function App() {
  

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainHome" component={MainTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
