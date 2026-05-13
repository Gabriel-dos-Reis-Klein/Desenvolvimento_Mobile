import * as React from 'react';

import {View, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider as PaperProvider } from 'react-native-paper';

import Login from './src/screens/Login';

import Home from './src/screens/Home';

import Details from './src/screens/Details';

import Register from './src/screens/Register';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const PedidosStack = createStackNavigator();

const ClientesScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Tela de Clientes em desenvolvimento</Text>
  </View>
);

// 1. Stack específico para a aba de Pedidos
//function PedidosStackScreen() {
  //return (
   // <PedidosStack.Navigator>
   //   <PedidosStack.Screen name="ListaPedidos" component={OrdersScreen} options={{ headerShown: false }} />
   //   <PedidosStack.Screen name="DetalhesPedido" component={DetailsScreen} />
   // </PedidosStack.Navigator>
  //);
//}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={Home} // Note que aqui chamamos o Stack de pedidos
        options={{ title: 'Pedidos' }} 
      />
      <Tab.Screen name="Clientes" component={ClientesScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Login" component={Login}/>

          <Stack.Screen name="Registro" component={Register} />

          <Stack.Screen name="MainHome" component={MainTabs} />

          <Stack.Screen name="Detalhes" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
