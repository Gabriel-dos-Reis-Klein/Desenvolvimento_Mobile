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
  orderService,
} from '../../services';



export default function OrderDetails({
  navigation, 
  //orderId: propOrderId, 
}){
  //const orderId = route?.params?.orderId || propOrderId
  const route = useRoute();
  const { orderId } = route.params; // orderId vindo da navegação
  const [order, setOrder] =
  useState([]);

  const [loading, setLoading] =
    useState(true);

    const [data, setData] = useState([])

    const fetchOrders = useCallback(
    async () => {
      try {
        setLoading(true);

        const data =
          await orderService.getById(orderId);
        console.log('Pedido recebido:', data);

        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },

    [orderId]
  );

  useEffect(() => {
  if (orderId) fetchOrders();
  }, [fetchOrders, orderId]);
  if (!order) return <EmptyState message="Pedido não encontrado" />;

  const valorFormatado = order.saldo
    ? `R$ ${Number(order.saldo).toFixed(2).replace('.', ',')}`
    : '—';

    const formatarData = (isoString) => {
    const dataA = new Date(isoString);
    return dataA.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

console.log('Props recebidas:', { navigation, route });
console.log('route?.params:', route?.params);
console.log('Pedido recebido:', data);

    return(
      <ScrollView>
      
      <Text >Pedido #{order.id}</Text>

      {/* Seção Cliente */}
      <View >
        <Text >Cliente</Text>
        <Text >
          {order.nomeCliente || 'Nome não informado'}
        </Text>
      </View>

      {/* Seção Serviço */}
      <View >
        <Text >Serviço</Text>
        <View >
          <Text >Tipo:</Text>
          <Text >{order.tipoPedido}</Text>
        </View>
        <View >
          <Text >Descrição:</Text>
          <Text >{order.descricao || '—'}</Text>
        </View>
        <View >
          <Text >Valor:</Text>
          <Text >{valorFormatado}</Text>
        </View>
        <View >
          <Text >Status:</Text>
          <Text >{order.statusPedido}</Text>
        </View>
      </View>

      {/* Seção Agendamentos */}
      {order.agendamentos && order.agendamentos.length > 0 && (
        <View >
          <Text >Agendamentos</Text>
          {order.agendamentos.map((ag, index) => (
            <View key={index} >
              <Text >
                {ag.tipo === 'prova' ? 'Prova' : 'Entrega'}
              </Text>
              <Text >
                {formatarData(ag.dataA)}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Seção Imagem (se houver) */}
      {order.imagem && (
        <View >
          <Text >Foto</Text>
          <Image
            source={{ uri: order.imagem }}
            style={styles.imagem}
            resizeMode="cover"
          />
        </View>
      )}
    </ScrollView>
    )
}