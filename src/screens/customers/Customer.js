import {
  useEffect,
  useState,
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

import AppFab
  from '../../components/common/AppFab';

import { Text } from 'react-native-paper';

export default function Customer({
  navigation,
}) {
  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

      setLoading(true);
      const data = await customerService.getAll();
      setCustomers(data);
      setLoading(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <View style={styles.container}>
      <ListHeader
        title="Clientes"
        total={customers.length}
      />

      <View style={styles.filterRow}>
        <FilterButton
          icon="sort-variant"
          onPress={fetchCustomers}
        />

        <FilterButton
          icon="filter-variant"
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

      <AppFab
        onPress={() =>
          navigation.navigate(
            'CreateCustomer'
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

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 25,
  },

  listPadding: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
});