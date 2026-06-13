import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { createStackNavigator } from '@react-navigation/stack';

import Order from '../screens/orders/Order';
import PedidoCriacao from '../screens/orders/PedidoCriacao';
import DetailsPedidos from '../screens/orders/DetailsPedidos';
import Customer from '../screens/customers/Customer';

import { COLORS } from '../theme/colors';
import { SPACING } from '../theme/spacing';
import { TYPOGRAPHY } from '../theme/typography';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function OrdersStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrderList" component={Order} />
      <Stack.Screen name="PedidoCriacao" component={PedidoCriacao} />
      <Stack.Screen name="DetailsPedidos" component={DetailsPedidos} />
    </Stack.Navigator>
  );
}

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Pedidos') {
            iconName = 'shirt';
          } else if (route.name === 'Clientes') {
            iconName = 'users';
          }

          return (
            <FontAwesome6
              name={iconName}
              size={size}
              color={color}
              solid={focused}
            />
          );
        },

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,

        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
        },

        tabBarItemStyle: {
          paddingTop: SPACING.sm,
          paddingBottom: SPACING.xs,
          height: 60,
        },

        tabBarLabelStyle: {
          ...TYPOGRAPHY.caption,
          marginTop: SPACING.xs,
        },
      })}
    >
      <Tab.Screen name="Pedidos" component={OrdersStack} />
      <Tab.Screen name="Clientes" component={Customer} />
    </Tab.Navigator>
  );
}

export default MainTab;