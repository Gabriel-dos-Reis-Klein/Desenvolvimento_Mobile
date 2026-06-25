import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import {
  Menu,
  Divider,
  Chip,
} from 'react-native-paper';

import {
  COLORS,
  SPACING,
} from '../../theme';
import {
  useCustomers,
} from '../../hooks';

import ListHeader from '../../components/common/ListHeader';
import SearchInput from '../../components/common/SearchInput';
import IconButton from '../../components/common/IconButton';
import EmptyState from '../../components/common/EmptyState';
import Fab from '../../components/common/Fab';
import CustomerCard from '../../components/customers/CustomerCard';
import CustomerSkeleton from '../../components/customers/CustomerSkeleton';

export default function Customer({ navigation }) {
  const {
    customers,
    loading,
    refreshing,
    searchText,
    setSearchText,
    sortBy,
    setSortBy,
    refresh,
  } = useCustomers();

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ListHeader
        title="Clientes"
        total={customers.length}
      />

      <SearchInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Pesquisar por cliente"
      />

      <View style={styles.toolbar}>
        <Chip compact icon="sort">
          {sortBy === 'NOME' ? 'A-Z' : 'Recentes'}
        </Chip>

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <IconButton
              icon="tune"
              onPress={() => setMenuVisible(true)}
            />
          }
        >
          <Menu.Item
            title="Mais recentes"
            leadingIcon="clock-outline"
            onPress={() => {
              setSortBy('CRIACAO');
              setMenuVisible(false);
            }}
          />
          <Divider />
          <Menu.Item
            title="Ordem alfabética"
            leadingIcon="sort-alphabetical-ascending"
            onPress={() => {
              setSortBy('NOME');
              setMenuVisible(false);
            }}
          />
        </Menu>
      </View>

      <View style={styles.contentContainer}>
        {loading ? (
          <CustomerSkeleton />
        ) : customers.length === 0 ? (
          <EmptyState message="Nenhum cliente encontrado" />
        ) : (
          <FlatList
            data={customers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CustomerCard
                customer={item}
                highlightQuery={searchText}
                onPress={() =>
                  navigation.navigate('CustomerDetails', {
                    customerId: item.id,
                  })
                }
              />
            )}
            style={styles.listContainer}
            contentContainerStyle={styles.listPadding}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={refresh}
          />
        )}
      </View>

      <Fab
        onPress={() => navigation.navigate('CreateCustomer')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  contentContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  listPadding: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 32, 
  }
});