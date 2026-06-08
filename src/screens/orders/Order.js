import {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';

import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

import {
  orderService,
} from '../../services';

import {
  ORDER_STATUS,
} from '../../constants';

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

import OrderFilterModal
  from '../../components/orders/OrderFilterModal';

import OrderSortModal
  from '../../components/orders/OrderSortModal';

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

  const [filterVisible, setFilterVisible] =
    useState(false);

  const [sortVisible, setSortVisible] =
    useState(false);

  const [selectedType, setSelectedType] =
    useState(null);

  const [selectedStatus, setSelectedStatus] =
    useState(null);

  const [selectedSort, setSelectedSort] =
    useState('alphabetical');

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

  const filteredOrders = useMemo(() => {
    let filtered =
      [...orders];

    if (selectedType) {
      filtered =
        filtered.filter(
          (order) =>
            order.tipoServico ===
            selectedType
        );
    }

    if (selectedStatus) {
      filtered =
        filtered.filter(
          (order) =>
            order.status ===
            selectedStatus
        );
    }

    switch (selectedSort) {

      case 'alphabetical':
        filtered.sort((a, b) => {
            const descA = a?.descricaoPeca ?? '';
            const descB = b?.descricaoPeca ?? '';
            return descA.localeCompare(descB, 'pt-BR');
          }
        );
        break;

      case 'deadline':
        filtered.sort((a, b) =>
          new Date(a.dataEntrega) -
          new Date(b.dataEntrega)
        );
        break;

      case 'client':
      filtered.sort((a, b) => {
        const nameA = a?.clienteNome ?? '';
        const nameB = b?.clienteNome ?? '';

        if (nameA === '' && nameB !== '') return 1;
        if (nameA !== '' && nameB === '') return -1;

        return nameA.localeCompare(nameB, 'pt-BR');
      });
      break;

      default:
        break;
    }

    return filtered;
  }, [
    orders,
    selectedType,
    selectedStatus,
    selectedSort,
  ]);

  return (
    <View style={styles.container}>
      <ListHeader
        title="Pedidos"
        total={filteredOrders.length}
      />

      <View style={styles.filterRow}>
        <FilterButton
          icon="sort-variant"
          onPress={() =>
            setSortVisible(true)
          }
        />

        <FilterButton
          icon="filter-variant"
          onPress={() =>
            setFilterVisible(true)
          }
        />
      </View>

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

      <Fab
        onPress={() =>
          navigation.navigate(
            'Criacao', { screen: 'PedidoCriacao' }
          )
        }
      />

      <OrderFilterModal
        visible={filterVisible}

        onClose={() =>
          setFilterVisible(false)
        }

        selectedType={selectedType}
        setSelectedType={setSelectedType}

        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      <OrderSortModal
        visible={sortVisible}

        onClose={() =>
          setSortVisible(false)
        }

        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
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