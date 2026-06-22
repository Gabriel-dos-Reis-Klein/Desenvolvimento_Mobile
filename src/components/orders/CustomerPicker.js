import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  Modal,
  Portal,
  Chip,
  Divider,
} from 'react-native-paper';

import {
  COLORS,
  SPACING,
  RADIUS,
  FONT_FAMILY,
} from '../../theme';

import SearchInput from '../common/SearchInput';
import Text from '../common/Text';
import IconButton from '../common/IconButton';
import CustomerSkeleton from '../customers/CustomerSkeleton'; 

export default function CustomerPicker({
  visible,
  customers,
  selectedCustomer,
  onDismiss,
  onSelect,
  loading = false,
}) {
  const [searchText, setSearchText] = useState('');

  const filteredCustomers = customers.filter((c) => {
    const text = searchText.toLowerCase();
    return (
      c.nome.toLowerCase().includes(text) ||
      c.telefone?.toLowerCase().includes(text)
    );
  });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {
          setSearchText('');
          onDismiss();
        }}
        contentContainerStyle={styles.container}
      >
        {/* SEARCH */}
        <SearchInput
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* TOOLBAR */}
        <View style={styles.toolbar}>
          <Chip compact icon="account">
            {loading ? 'Carregando...' : `${filteredCustomers.length} clientes`}
          </Chip>

          <IconButton
            icon="close"
            onPress={() => {
              setSearchText('');
              onDismiss();
            }}
          />
        </View>

        <Divider />

        {/* LIST / SKELETON */}
        {loading ? (
          // Exibe os skeletons em loop se estiver carregando
          <View style={styles.skeletonContainer}>
            <CustomerSkeleton />
          </View>
        ) : (
          // Exibe a lista real quando terminar de carregar
          <FlatList
            data={filteredCustomers}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => {
              const isSelected =
                selectedCustomer?.id === item.id;

              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.card,
                    isSelected && styles.cardSelected,
                  ]}
                  onPress={() => {
                    onSelect(item);
                    setSearchText('');
                    onDismiss();
                  }}
                >
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {item.nome.charAt(0).toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.info}>
                    <Text style={styles.name}>
                      {item.nome}
                    </Text>

                    <Text
                      variant="small"
                      color={COLORS.textSecondary}
                    >
                      {item.telefone}
                    </Text>
                  </View>

                  {isSelected && (
                    <IconButton
                      icon="check"
                      size={18}
                      color={COLORS.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        )}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    margin: SPACING.lg,
    borderRadius: RADIUS.xl,
    paddingTop: SPACING.lg,
  },

  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
  },

  list: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },

  // Ajuste de padding interno para o skeleton alinhar perfeitamente com a margem do modal
  skeletonContainer: {
    paddingTop: SPACING.md,
    paddingHorizontal: 0, 
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.sm,
  },

  cardSelected: {
    backgroundColor: COLORS.primary10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: COLORS.primary,
    fontFamily: FONT_FAMILY.robotoBold,
  },

  info: {
    flex: 1,
    marginLeft: SPACING.md,
  },

  name: {
    fontFamily: FONT_FAMILY.robotoBold,
  },
});