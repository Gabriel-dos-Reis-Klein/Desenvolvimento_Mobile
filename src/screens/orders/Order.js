import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Divider, Chip } from 'react-native-paper';

import { COLORS, SPACING } from '../../theme';
import { useOrders } from '../../hooks';

import ListHeader from '../../components/common/ListHeader';
import SearchInput from '../../components/common/SearchInput';
import IconButton from '../../components/common/IconButton';
import EmptyState from '../../components/common/EmptyState';
import Fab from '../../components/common/Fab';
import OrderCard from '../../components/orders/OrderCard';
import Loading from '../../components/common/Loading';

export default function Order({ navigation }) {
  const {
    orders,
    loading,
    refreshing,
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    refresh,
  } = useOrders();

  const [menuVisible, setMenuVisible] = useState(false);

  const getSortLabel = () => {
    switch (sortBy) {
      case 'NOME': return 'Cliente';
      case 'PRAZO': return 'Prazo';
      default: return 'Título';
    }
  };

  const getStatusLabel = () => {
    switch (statusFilter) {
      case 'PENDENTE': return 'Pendentes';
      case 'EXECUTANDO': return 'Executando';
      case 'CONCLUIDO': return 'Concluídos';
      default: return 'Todos';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ListHeader title="Pedidos" total={orders.length} />

      <SearchInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Pesquisar por pedido"
      />

      <View style={styles.toolbar}>
        <View style={styles.chipGroup}>
          <Chip compact icon="sort">
            {getSortLabel()}
          </Chip>
          {statusFilter ? (
            <Chip 
              compact 
              icon="filter" 
              onClose={() => setStatusFilter('')}
              style={styles.filterChip}
              textStyle={styles.filterChipText}
            >
              {getStatusLabel()}
            </Chip>
          ) : null}
        </View>

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
          <Menu.Item title="Filtrar: Todos" leadingIcon="filter-variant" onPress={() => { setStatusFilter(''); setMenuVisible(false); }} />
          <Menu.Item title="Filtrar: Pendentes" leadingIcon="clock-outline" onPress={() => { setStatusFilter('PENDENTE'); setMenuVisible(false); }} />
          <Menu.Item title="Filtrar: Executando" leadingIcon="progress-wrench" onPress={() => { setStatusFilter('EXECUTANDO'); setMenuVisible(false); }} />
          <Menu.Item title="Filtrar: Concluídos" leadingIcon="check-circle-outline" onPress={() => { setStatusFilter('CONCLUIDO'); setMenuVisible(false); }} />
          <Divider />
          <Menu.Item title="Ordenar: Título" leadingIcon="sort-alphabetical-ascending" onPress={() => { setSortBy('TITULO'); setMenuVisible(false); }} />
          <Menu.Item title="Ordenar: Cliente" leadingIcon="account-sort" onPress={() => { setSortBy('NOME'); setMenuVisible(false); }} />
          <Menu.Item title="Ordenar: Prazo" leadingIcon="calendar-clock" onPress={() => { setSortBy('PRAZO'); setMenuVisible(false); }} />
        </Menu>
      </View>

      <View style={styles.contentContainer}>
        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <EmptyState message="Nenhum pedido encontrado" />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OrderCard
                order={item}
                highlightQuery={searchText}
                onPress={() =>
                  navigation.navigate('OrderDetails', {
                    orderId: item.id,
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

      <Fab onPress={() => navigation.navigate('CreateOrder')} />
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
  chipGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
  },
  filterChip: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipText: {
    textAlignVertical: 'center',
  },
});