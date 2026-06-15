import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Customer from '../screens/customers/Customer';
import Order from '../screens/orders/Order';

import {
  createScreenOptions,
} from './config/tab.config';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={createScreenOptions}
    >
      <Tab.Screen
        name="Pedidos"
        component={Order}
      />

      <Tab.Screen
        name="Clientes"
        component={Customer}
      />
    </Tab.Navigator>
  );
}