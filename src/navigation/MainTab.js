import { createBottomTabNavigator } 
    from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import Order from '../screens/orders/Order';
import Customer from '../screens/customers/Customer';
const IconeHomeAtivo = require('../assets/pedidoAtivo.png');
const IconeHomeInativo = require('../assets/pedidoInativo.png');
const IconeContatoAtivo = require('../assets/contatoAtivo.png');
const IconeContatoInativo = require('../assets/contatoInativo.png');

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Pedidos" component={Order} options={{
    tabBarIcon: ({ focused, size }) => (
      <Image 
        source={focused ? IconeHomeAtivo : IconeHomeInativo} 
        style={{ width: size, height: size }} 
        resizeMode="contain"
      />
    ),
  }} />
      <Tab.Screen name="Clientes" component={Customer} options={{
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

export default MainTab;