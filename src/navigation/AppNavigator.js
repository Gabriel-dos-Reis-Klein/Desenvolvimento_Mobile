import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import MainTab from './MainTab';

import CreateCustomer from '../screens/customers/CreateCustomer';
import CreateOrder from '../screens/orders/CreateOrder';
import OrderDetails from '../screens/orders/OrderDetails';
import ItemForm from '../screens/orders/ItemForm';
import CustomerDetails from '../screens/customers/CustomerDetails';
import Planner from '../screens/orders/Planner'; 

import { EditProfile, CreateUser } from '../screens/settings';
import { AuthContext } from '../contexts/AuthContext';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { signed, loading, isAdmin } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {signed ? (
        <>
          <Stack.Screen name="Main" component={MainTab} />

          {/* Orders & Planner */}
          <Stack.Screen name="CreateOrder" component={CreateOrder} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
          <Stack.Screen name="ItemForm" component={ItemForm} />
          <Stack.Screen name="Planner" component={Planner} />

          {/* Customers */}
          <Stack.Screen name="CreateCustomer" component={CreateCustomer} />
          <Stack.Screen name="CustomerDetails" component={CustomerDetails} />

          {/* Settings */}
          <Stack.Screen name="EditProfile" component={EditProfile} />
          {isAdmin && (
            <Stack.Screen name="CreateUser" component={CreateUser} />
          )}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}