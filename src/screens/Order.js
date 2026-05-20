import {
  useEffect,
  useState,
  useCallback,
} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  FAB,
  IconButton,
} from 'react-native-paper';

import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
  orderService,
} from '../services';

import OrderCard
  from '../components/orders/OrderCard';

import Loading
  from '../components/common/Loading';

import EmptyState
  from '../components/common/EmptyState';

export default function OrdersScreen({
  navigation,
}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const fetchOrders = useCallback(
    async () => {
      try {
        setLoading(true);

        const data =
          await orderService.getAll();

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

  return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <IconButton
          icon="cog-outline"
          size={26}
        />

        <IconButton
          icon="magnify"
          size={26}
        />
      </View>

      <View style={styles.titleArea}>
        <Text style={styles.headerTitle}>
          Pedidos
        </Text>

        <Text style={styles.subTitle}>
          {orders.length} resultados
        </Text>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={styles.filterBox}
        >
          <MaterialCommunityIcons
            name="sort-variant"
            size={24}
            color="#333"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterBox}
        >
          <MaterialCommunityIcons
            name="filter-variant"
            size={24}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <EmptyState
          message="Nenhum pedido encontrado"
        />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) =>
            item.id
          }
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onPress={() =>
                navigation.navigate(
                  'OrderDetails',
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

      <FAB
        icon="plus"
        color="white"
        style={styles.fab}
        onPress={() =>
          navigation.navigate(
            'CreateOrder'
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  titleArea: {
    alignItems: 'center',
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
  },

  subTitle: {
    fontSize: 14,
    color: '#888',
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 25,
  },

  filterBox: {
    width: 55,
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  listPadding: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#FF3366',
  },
});