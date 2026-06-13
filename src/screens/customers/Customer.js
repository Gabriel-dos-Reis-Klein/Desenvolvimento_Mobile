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
  customerService,
} from '../../services';

import CustomerCard
  from '../../components/customers/CustomerCard';

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
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Customer({
  navigation,
}) {
  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchCustomers = useCallback(
    async () => {
      try {
        setLoading(true);
        const data =
          await customerService.getAll();

        setCustomers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },

    []
  );

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ListHeader
        title="Clientes"
        total={customers.length}
      />

      <View style={styles.filterRow}>
        <FilterButton
          icon="sort-alpha-down"
          onPress={fetchCustomers}
        />

        <FilterButton
          icon="filter"
        />
      </View>

      {loading ? (
        <Loading />
      ) : customers.length === 0 ? (
        <EmptyState
          message="Nenhum cliente encontrado"
        />
      ) : (
        <FlatList
          data={customers}
          keyExtractor={(item) =>
            item.id
          }

          renderItem={({ item }) => (
            <CustomerCard
              customer={item}
              onPress={() =>
                navigation.navigate(
                  'CustomerDetails',
                  {
                    customerId:
                      item.id,
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
            'Criacao', { screen: 'ClienteCriacao' }
          )
        }
      />
    </SafeAreaView>
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

    paddingBottom:
      100,
  },
});