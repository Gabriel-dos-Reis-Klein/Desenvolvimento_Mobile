import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Chame o Hook no componente legítimo!

import Customer from '../screens/customers/Customer';
import Order from '../screens/orders/Order';
import { createScreenOptions } from './config/tab.config';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={(props) => createScreenOptions(props, insets)}
    >
      <Tab.Screen name="Pedidos" component={Order} />
      <Tab.Screen name="Clientes" component={Customer} />
    </Tab.Navigator>
  );
}