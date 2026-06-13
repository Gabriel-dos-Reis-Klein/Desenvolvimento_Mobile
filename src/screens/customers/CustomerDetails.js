import { View, FlatList, ActivityIndicator, ScrollView, Image } from "react-native";
import {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import Loading from '../../components/common/Loading';
import { useRoute } from '@react-navigation/native';
import ListHeader from '../../components/common/ListHeader';
import {
  COLORS,
  SPACING,
  RADIUS,
  TYPOGRAPHY,
  FONT_FAMILY,
} from '../../theme';
import Text
  from '../../components/common/Text';
import EmptyState
  from '../../components/common/EmptyState';
  import OrderCard
  from '../../components/orders/OrderCard';
import {
  customerService,
} from '../../services';



export default function CustomerDetails({
  navigation, 
  customersId: propCustomerId, 
}){
  const route = useRoute();
  //const customersId = route?.params?.customersId || propCustomerId
  const { customersId } = route.params; // orderId vindo da navegação
  const [customers, setCustomers] = useState([null]);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

    const fetchCustomers = useCallback(
    async () => {
      try {
        setLoading(true);

        const data =
          await customerService.getById(customersId);
        console.log('Pedido recebido:', data);

        setCustomers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },

    [customersId]
  );

  useEffect(() => {
  if (customersId) fetchCustomers();
  }, [fetchCustomers, customersId]);

console.log('Props recebidas:', { route });
console.log('route?.params:', route?.params);
console.log('Pedido recebido:', data);

    return(
      <ScrollView>
      
      <Text >Cliente #{customers.id}</Text>


      <View >
        <Text >Cliente</Text>
        <Text >
          {customers.nome || 'Nome não informado'}
        </Text>
        {customers.telefone && <Text >{customers.telefone}</Text>}
        {customers.descricao && <Text>{customers.descricao}</Text>}
      </View>

    
    </ScrollView>
    )
}