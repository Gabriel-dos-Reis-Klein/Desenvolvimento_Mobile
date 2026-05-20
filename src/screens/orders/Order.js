import {
  useEffect,
  useState,
  useCallback,
} from 'react';

import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

import {
  orderService,
} from '../../services';

import OrderCard
  from '../../components/orders/OrderCard';

import Loading
  from '../../components/common/Loading';

import EmptyState
  from '../../components/common/EmptyState';

import ListHeader
  from '../../components/common/ListHeader';

import FilterButton
  from '../../components/common/FilterButton';

import Fab
  from '../../components/common/Fab';

import {
  COLORS,
  SPACING,
} from '../../theme';

export default function OrdersScreen({
  navigation,
}) {
  const [orders, setOrders] =
    useState([]);

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
      <ListHeader
        title="Pedidos"
        total={orders.length}
      />

      <View style={styles.filterRow}>
        <FilterButton
          icon="sort-variant"
          onPress={fetchOrders}
        />

        <FilterButton
          icon="filter-variant"
        />
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
            item.id.toString()
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

      <Fab
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

    backgroundColor:
      COLORS.background,
  },

  filterRow: {
    flexDirection: 'row',

    justifyContent: 'center',

    gap: SPACING.md,

    marginBottom: SPACING.lg,
  },

  listPadding: {
    paddingHorizontal:
      SPACING.lg,

    paddingBottom: 100,
  },
});