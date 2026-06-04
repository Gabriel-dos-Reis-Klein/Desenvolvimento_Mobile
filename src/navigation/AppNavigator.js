import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createStackNavigator,
} from '@react-navigation/stack';

import MainTab
  from './MainTab';

import DetailsPedidos
  from '../screens/orders/DetailsPedidos'

const Stack = createStackNavigator();

export default function AppNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainTab}
        />

        <Stack.Screen
          name="OrderDetails"
          component={DetailsPedidos}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}