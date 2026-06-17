import {
  Card,
  Searchbar,
  Avatar,
} from 'react-native-paper';

import {
  FlatList,
  StyleSheet,
} from 'react-native';

import {
  COLORS,
  SPACING,
} from '../../theme';

export default function CustomerSelector({
  customers,
  search,
  onSearch,
  selectedCustomer,
  onSelect,
}) {
  return (
    <>
      <Searchbar
        placeholder="Buscar cliente"
        value={search}
        onChangeText={onSearch}
        style={styles.search}
      />

      {selectedCustomer && (
        <Card style={styles.selected}>
          <Card.Title
            title={selectedCustomer.nome}
            subtitle={selectedCustomer.telefone}
            left={() => (
              <Avatar.Text
                size={40}
                label={
                  selectedCustomer.nome
                    .charAt(0)
                    .toUpperCase()
                }
              />
            )}
          />
        </Card>
      )}

      {!selectedCustomer && (
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              onPress={() =>
                onSelect(item)
              }
            >
              <Card.Title
                title={item.nome}
                subtitle={
                  item.telefone
                }
              />
            </Card>
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  search: {
    marginBottom: SPACING.md,
    backgroundColor:
      COLORS.surface,
  },

  selected: {
    marginBottom: SPACING.lg,
  },

  card: {
    marginBottom: SPACING.sm,
  },
});