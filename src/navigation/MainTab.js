import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Customer from '../screens/customers/Customer';
import Order from '../screens/orders/Order';
import Settings from '../screens/settings/Settings';
import { createScreenOptions } from './config/tab.config'; // Verifique se esse cara não importa o MainTab de volta!
import Planner from '../screens/orders/Planner';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={(props) => createScreenOptions(props, insets)}
    >
      <Tab.Screen name="Pedidos" component={Order} />
      <Tab.Screen name="Clientes" component={Customer} />
      <Tab.Screen name="Config." component={Settings} />
      <Tab.Screen name="Agenda" component={Planner} />
    </Tab.Navigator>
  );
}