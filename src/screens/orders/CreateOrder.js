import {
  useMemo,
  useState,
} from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  COLORS,
  SPACING,
} from '../../theme';

import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Text from '../../components/common/Text';

import CustomerPicker from '../../components/orders/CustomerPicker';
import OrderItemCard from '../../components/orders/OrderItemCard';
import AddItemModal from '../../components/orders/AddItemModal';
import PaymentSelector from '../../components/orders/PaymentSelector';
import OrderSummaryCard from '../../components/orders/OrderSummaryCard';
import OrderSection from '../../components/orders/OrderSection';

import {
  customerService,
  orderService,
} from '../../services';

import {
  showError,
} from '../../errors/showError';

import {
  showSuccess,
} from '../../errors/showSuccess';

export default function CreateOrder({
  navigation,
}) {
  const [title, setTitle] =
    useState('');

  const [customers, setCustomers] =
    useState([]);

  const [
    selectedCustomer,
    setSelectedCustomer,
  ] = useState(null);

  const [items, setItems] =
    useState([]);

  const [advance, setAdvance] =
    useState('');

  const [
    paymentType,
    setPaymentType,
  ] = useState('');

  const [loading, setLoading] =
    useState(false);

  const [
    customerVisible,
    setCustomerVisible,
  ] = useState(false);

  const [itemVisible, setItemVisible] =
    useState(false);

  const total = useMemo(
    () =>
      items.reduce(
        (acc, item) =>
          acc +
          Number(item.valor || 0),
        0
      ),
    [items]
  );

  const handleAddItem = (item) => {
    setItems((prev) => [
      ...prev,
      item,
    ]);
  };

  const loadCustomers =
    async () => {
      try {
        const data =
          await customerService.getAll();

        setCustomers(data);

      } catch (error) {
        showError(error);
      }
    };

  const handleCreate =
    async () => {
      try {
        if (!selectedCustomer) {
          return showError(
            'Selecione um cliente.'
          );
        }

        if (items.length === 0) {
          return showError(
            'Adicione pelo menos um item.'
          );
        }

        setLoading(true);

        await orderService.create({
          titulo: title,
          itens: items,

          idCliente:
            selectedCustomer.id,

          pagamentoAntecipado:
            Number(advance || 0),

          tipoPagamento:
            paymentType,
        });

        showSuccess(
          'Pedido criado com sucesso!',
          () => navigation.goBack()
        );

      } catch (error) {
        showError(error);

      } finally {
        setLoading(false);
      }
    };

return (
  <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
      <PageHeader
        title="Criar Pedido"
        onBack={() => navigation.goBack()}
      />
    </View>

    <KeyboardAvoidingView
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }
      style={styles.keyboardView}
    >
      <View style={styles.scrollContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.content
          }
        >
          <TouchableOpacity
            style={styles.selectorCard}
            onPress={() => {
              loadCustomers();
              setCustomerVisible(true);
            }}
          >
            <Text
              variant="small"
              color={COLORS.textSecondary}
            >
              Cliente
            </Text>

            <Text variant="body">
              {selectedCustomer
                ? selectedCustomer.nome
                : 'Selecionar cliente'}
            </Text>

            {selectedCustomer && (
              <Text
                variant="small"
                color={COLORS.textSecondary}
              >
                {selectedCustomer.telefone}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <Input
              label="Título do Pedido"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.summaryContainer}>
            <OrderSummaryCard
              quantity={items.length}
              total={total}
              advance={Number(
                advance || 0
              )}
            />
          </View>

          <OrderSection
            title={`Itens (${items.length})`}
          >
            {items.map(
              (item, index) => (
                <OrderItemCard
                  key={index}
                  item={item}
                />
              )
            )}

            <Button
              title="Adicionar Item"
              variant="secondary"
              onPress={() =>
                setItemVisible(true)
              }
            />
          </OrderSection>

          <OrderSection title="Pagamento">
          <View style={styles.paymentContainer}>
            <View style={styles.paymentRow}>
              <PaymentSelector
                value={paymentType}
                onChange={setPaymentType}
              />
            </View>

            <Input
              label="Entrada"
              keyboardType="numeric"
              value={advance}
              onChangeText={setAdvance}
            />
          </View>
        </OrderSection>

          <View
            style={styles.buttonContainer}
          >
            <Button
              title="Criar Pedido"
              loading={loading}
              onPress={handleCreate}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>

    <CustomerPicker
      visible={customerVisible}
      customers={customers}
      selectedCustomer={selectedCustomer}
      onDismiss={() => setCustomerVisible(false)}
      onSelect={setSelectedCustomer}
    />

    <AddItemModal
      visible={itemVisible}
      onDismiss={() =>
        setItemVisible(false)
      }
      onAdd={handleAddItem}
    />
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,

    ...Platform.select({
      web: {
        height: '100vh',
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
      },
    }),
  },

  headerContainer: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
  },

  keyboardView: {
    flex: 1,
    width: '100%',
  },

  scrollContainer: {
    flex: 1,
    height: '100%',

    ...Platform.select({
      web: {
        maxHeight:
          'calc(100vh - 70px)',
      },
    }),
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal:
      SPACING.xl,

    paddingVertical:
      SPACING.xl,

    paddingBottom:
      SPACING.xl * 4,

    flexGrow: 1,
  },

  selectorCard: {
    backgroundColor:
      COLORS.surface,

    borderWidth: 1,
    borderColor:
      COLORS.border,

    borderRadius: 16,

    padding: SPACING.lg,

    marginBottom:
      SPACING.lg,
  },

  sectionCard: {
    backgroundColor:
      COLORS.surface,

    borderWidth: 1,
    borderColor:
      COLORS.border,

    borderRadius: 16,

    padding: SPACING.lg,

    marginBottom:
      SPACING.lg,
  },

  summaryContainer: {
    marginBottom:
      SPACING.lg,
  },

  inputWrapper: {
    marginBottom: SPACING.md,
  },

  paymentContainer: {
    gap: SPACING.md,
  },

  paymentRow: {
    alignItems: 'flex-start',
  },
});