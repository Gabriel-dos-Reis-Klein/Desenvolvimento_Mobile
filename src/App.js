import * as React from 'react';
import {View, Text, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper'; 

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import Register from './src/screens/Register';
import Clientes from './src/screens/Clientes'
import ClienteCriacao from './src/screens/ClienteCriacao'
import PedidoCriacao from './src/screens/PedidoCriacao'
import CriacaoPedido from './src/screens/CriacaoPedido'
const IconeHomeAtivo = require('./src/assets/pedidoAtivo.png');
const IconeHomeInativo = require('./src/assets/pedidoInativo.png');
const IconeContatoAtivo = require('./src/assets/contatoAtivo.png');
const IconeContatoInativo = require('./src/assets/contatoInativo.png');

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const CriacaoStack = createStackNavigator();

function CriacaoStackScreen() {
  return (
    <CriacaoStack.Navigator>
      <CriacaoStack.Screen name="ClienteCriacao" component={ClienteCriacao} options={{headerShown: false}}/>
      <CriacaoStack.Screen name="PedidoCriacao" component={PedidoCriacao} options={{ headerShown: false }}/>
    </CriacaoStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
  name="Home" 
  component={Home} 
  options={{
    tabBarIcon: ({ focused, size }) => (
      <Image 
        source={focused ? IconeHomeAtivo : IconeHomeInativo} 
        style={{ width: size, height: size }} 
        resizeMode="contain"
      />
    ),
  }} 
/>
      <Tab.Screen name="Clientes" component={Clientes} options={{
    tabBarIcon: ({ focused, size }) => (
      <Image 
        source={focused ? IconeContatoAtivo : IconeContatoInativo} 
        style={{ width: size, height: size }} 
        resizeMode="contain"
      />
    ),
  }} />
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

          <Stack.Screen name="Criacao" component={CriacaoStackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
