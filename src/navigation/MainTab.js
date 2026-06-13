import { createBottomTabNavigator } 
    from '@react-navigation/bottom-tabs';

import Order 
  from '../screens/orders/Order';

import Customer
  from '../screens/customers/Customer';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Pedidos" component={Order} />
      <Tab.Screen name="Clientes" component={Customer} />
    </Tab.Navigator>
  );
}

export default MainTab;