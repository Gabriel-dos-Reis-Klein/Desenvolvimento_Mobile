import { createStackNavigator } from '@react-navigation/stack';

import PedidoCriacao from '../screens/orders/PedidoCriacao';
import ClienteCriacao from '../screens/customers/ClienteCriacao';

const Stack = createStackNavigator();

function Create() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PedidoCriacao" component={PedidoCriacao} />
      <Stack.Screen name="ClienteCriacao" component={ClienteCriacao} />
    </Stack.Navigator>
  );
}

export default Create;