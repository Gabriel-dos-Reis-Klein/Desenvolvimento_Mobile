import { createStackNavigator } from '@react-navigation/stack';

import OrderDetails from '../screens/orders/OrderDetails';
import CustomerDetails from '../screens/customers/CustomerDetails';

const Stack = createStackNavigator();

function Details() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PedidosDescricao" component={OrderDetails} />
      <Stack.Screen name="ClientesDescricao" component={CustomerDetails} />
    </Stack.Navigator>
  );
}

export default Details;