import { View, FlatList, ActivityIndicator } from "react-native";
import {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import Loading from '../../components/common/Loading';
import ListHeader from '../../components/common/ListHeader';
import {
  COLORS,
  SPACING,
  RADIUS,
  TYPOGRAPHY,
  FONT_FAMILY,
} from '../../themes';
import Text
  from '../../components/common/Text';
import EmptyState
  from '../../components/common/EmptyState';



export default function DetailsPedidos({
  navigation,
}){
      const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

    const [data, setData] = useState([])

    const fetchOrders = useCallback(
    async () => {
      try {
        setLoading(true);

        const data =
          await orderService.getById(item.id);

        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },

    []
  );

  useEffect(() => {
    fetchOrders();
  }, []);

    return(
        <View>
            <Text>Estamos na tela detalhes</Text>
           {loading ? (
        <Loading />
      ) : filteredOrders.length === 0 ? (
        <EmptyState
          message="Nenhum pedido encontrado"
        />
      ) : (
        <FlatList
          data={filteredOrders}

          keyExtractor={(item) =>
            item.id.toString()
          }

          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onPress={() =>
                navigation.navigate(
                  'DetailsPedidos',
                  {
                    orderId: item.id,
                  }
                )
              }
            />
          )}
          contentContainerStyle={
            styles.listPadding
          }

          showsVerticalScrollIndicator={
            false
          }
        />
      )}
        </View>
    )
}