import * as React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';

import Login from './screens/Login';
import Home from './screens/Home';
import Details from './screens/Details';
import Register from './screens/Register';
import Clientes from './screens/Clientes'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const PedidosStack = createStackNavigator();

/*function PedidosStackScreen() {
  return (
    <PedidosStack.Navigator>
      <PedidosStack.Screen name="ListaPedidos" component={OrdersScreen} options={{ headerShown: false }} />
      <PedidosStack.Screen name="DetalhesPedido" component={DetailsScreen} />
    </PedidosStack.Navigator>
  );
}*/

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{ title: 'Pedidos' }} 
      />
      <Tab.Screen name="Clientes" component={Clientes} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>



          <Stack.Screen name="MainHome" component={MainTabs} />

          <Stack.Screen name="Detalhes" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
