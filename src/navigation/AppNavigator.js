import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import MainTab from './MainTab';

import CreateCustomer from '../screens/customers/CreateCustomer';
import CreateOrder from '../screens/orders/CreateOrder';
import OrderDetails from '../screens/orders/OrderDetails';
import ItemForm from '../screens/orders/ItemForm';
import CustomerDetails from '../screens/customers/CustomerDetails';
import Welcome from '../screens/auth/Welcome';

import { Settings, EditProfile, ChangePassword } from '../screens/settings';

import { AuthContext } from '../contexts/AuthContext';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          gestureEnabled: true,
        }}
      >
        {signed ? (
          <>
            <Stack.Screen name="Main" component={MainTab} />
            
            <Stack.Screen name="Welcome" component={Welcome} />

            {/* Pedidos (Orders) */}
            <Stack.Screen name="CreateOrder" component={CreateOrder} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
            <Stack.Screen name="ItemForm" component={ItemForm} />

            {/* Clientes (Customers) */}
            <Stack.Screen name="CreateCustomer" component={CreateCustomer} />
            <Stack.Screen name="CustomerDetails" component={CustomerDetails} />

            {/* Configurações (Settings) */}
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}