import { createBottomTabNavigator } 
    from '@react-navigation/bottom-tabs';

import { createStackNavigator }
    from '@react-navigation/stack';

import Order 
  from '../screens/orders/Order';

import PedidoCriacao
  from '../screens/orders/PedidoCriacao';

import DetailsPedidos
  from '../screens/orders/DetailsPedidos';

import Customer
  from '../screens/customers/Customer';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function OrdersStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="OrderList" 
        component={Order} 
      />
      <Stack.Screen 
        name="PedidoCriacao" 
        component={PedidoCriacao} 
      />
      <Stack.Screen 
        name="DetailsPedidos" 
        component={DetailsPedidos} 
      />
    </Stack.Navigator>
  );
}

function MainTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Pedidos" 
        component={OrdersStack} 
      />
      <Tab.Screen name="Clientes" component={Customer} />
    </Tab.Navigator>
  );
}

export default MainTab;