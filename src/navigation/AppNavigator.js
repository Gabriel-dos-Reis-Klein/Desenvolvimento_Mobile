import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createStackNavigator,
} from '@react-navigation/stack';

import Login
  from '../screens/auth/Login';

import Register
  from '../screens/auth/Register';

import MainTab
  from './MainTab';

import Details
from './Details';

import Create from './Create'

const Stack = createStackNavigator();

export default function AppNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={Login} 
        />

        <Stack.Screen 
          name="Register" 
          component={Register} 
        />

        <Stack.Screen
          name="Main"
          component={MainTab}
        />

        <Stack.Screen
          name="Details"
          component={Details}
        />

        <Stack.Screen
          name="Create"
          component={Create}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}