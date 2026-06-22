import { 
  useContext 
} from 'react';

import { 
  NavigationContainer 
} from '@react-navigation/native';

import { 
  createStackNavigator 
} from '@react-navigation/stack';

import Login 
  from '../screens/auth/Login';

import Register 
  from '../screens/auth/Register';

import MainTab 
  from './MainTab';

import CreateCustomer
  from '../screens/customers/CreateCustomer';

import CreateOrder
  from '../screens/orders/CreateOrder';

import OrderDetails
  from '../screens/orders/OrderDetails';

import { 
  AuthContext 
} from '../contexts/AuthContext';

import ItemForm 
  from '../screens/orders/ItemForm';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {signed ? (
          <>
            <Stack.Screen
              name="Main"
              component={MainTab}
            />

            <Stack.Screen
              name="CreateCustomer"
              component={CreateCustomer}
            />

            <Stack.Screen
              name="CreateOrder"
              component={CreateOrder}
            />

            <Stack.Screen
              name="OrderDetails"
              component={OrderDetails}
            />

            <Stack.Screen
              name="ItemForm"
              component={ItemForm}
            />
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