import { useMemo, useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { COLORS, SPACING } from '../../theme';

import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Text from '../../components/common/Text';

import CustomerPicker from '../../components/orders/CustomerPicker';
import OrderItemCard from '../../components/orders/OrderItemCard';
import PaymentSelector from '../../components/orders/PaymentSelector';
import OrderSummaryCard from '../../components/orders/OrderSummaryCard';
import OrderSection from '../../components/orders/OrderSection';

import { customerService, orderService } from '../../services';
import { showError } from '../../errors/showError';
import { showSuccess } from '../../errors/showSuccess';

export default function CreateOrder({ navigation }) {
  const [title, setTitle] = useState('');

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [items, setItems] = useState([]);

  const [advance, setAdvance] = useState('');
  const [paymentType, setPaymentType] = useState('');

  const [loading, setLoading] = useState(false);
  const [customerVisible, setCustomerVisible] = useState(false);

  // -------------------------
  // TOTAL
  // -------------------------
  const total = useMemo(() => {
    return items.reduce((acc, item) => {
      const value = Number(item.valor);
      return acc + (isNaN(value) ? 0 : value);
    }, 0);
  }, [items]);

  // -------------------------
  // CUSTOMERS
  // -------------------------
  const loadCustomers = async () => {
    try {
      const data = await customerService.getAll();
      setCustomers(data);
    } catch (error) {
      showError(error);
    }
  };

  // -------------------------
  // ADD / EDIT ITEM (NAVIGATION FLOW)
  // -------------------------
  const handleAddItem = () => {
    navigation.navigate('ItemForm', {
      mode: 'create',
      onSave: (newItem) => {
        setItems((prev) => [...prev, newItem]);
      },
    });
  };

  const handleEditItem = (item, index) => {
    navigation.navigate('ItemForm', {
      mode: 'edit',
      item,
      index,
      onSave: (updatedItem) => {
        setItems((prev) =>
          prev.map((current, i) =>
            i === index ? updatedItem : current
          )
        );
      },
    });
  };

  const handleDeleteItem = (index) => {
    setItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // -------------------------
  // CREATE ORDER
  // -------------------------
  const handleCreate = async () => {
    try {
      if (!selectedCustomer) {
        return showError('Selecione um cliente.');
      }

      if (!paymentType) {
        return showError('Selecione o tipo de pagamento.');
      }

      if (items.length === 0) {
        return showError('Adicione pelo menos um item.');
      }

      setLoading(true);

      await orderService.create({
        titulo: title,
        itens: items,
        idCliente: selectedCustomer.id,
        pagamentoAntecipado: Number(advance || 0),
        tipoPagamento: paymentType,
      });

      showSuccess('Pedido criado com sucesso!', () =>
        navigation.goBack()
      );
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.headerContainer}>
        <PageHeader
          title="Criar Pedido"
          onBack={() => navigation.goBack()}
        />
      </View>

      <View style={styles.body}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={styles.scroll}
            contentContainerStyle={styles.content}
          >
            <View style={styles.inputWrapper}>
              <Input
                label="Título do Pedido"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <TouchableOpacity
              style={styles.selectorCard}
              onPress={() => {
                loadCustomers();
                setCustomerVisible(true);
              }}
            >
              <Text variant="small" color={COLORS.textSecondary}>
                Cliente
              </Text>

              <Text variant="body">
                {selectedCustomer
                  ? selectedCustomer.nome
                  : 'Selecionar cliente'}
              </Text>

              {!!selectedCustomer && (
                <Text variant="small" color={COLORS.textSecondary}>
                  {selectedCustomer.telefone}
                </Text>
              )}
            </TouchableOpacity>

            <OrderSummaryCard
              quantity={items.length}
              total={total}
              advance={Number(advance || 0)}
            />

            <OrderSection title="Pagamento">
              <View style={styles.paymentContainer}>
                <PaymentSelector
                  value={paymentType}
                  onChange={setPaymentType}
                />

                <Input
                  label="Entrada"
                  keyboardType="numeric"
                  value={advance}
                  onChangeText={setAdvance}
                />
              </View>
            </OrderSection>

            <OrderSection title={`Itens (${items.length})`}>
              {items.map((item, index) => (
                <OrderItemCard
                  key={index}
                  item={item}
                  onEdit={() => handleEditItem(item, index)}
                  onDelete={() => handleDeleteItem(index)}
                />
              ))}

              {/* Novo botão placeholder tracejado */}
              <TouchableOpacity 
                style={styles.dashedButton} 
                onPress={handleAddItem}
                activeOpacity={0.6}
              >
                <FontAwesome6 name="plus" size={14} color={COLORS.primary} />
                <Text style={styles.dashedButtonText}>Adicionar Item</Text>
              </TouchableOpacity>
            </OrderSection>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <View style={styles.footer}>
        <Button
          title="Criar Pedido"
          loading={loading}
          onPress={handleCreate}
        />
        <Button 
          title="Cancelar" 
          variant="secondary" 
          onPress={() => navigation.goBack()} 
        />
      </View>

      <CustomerPicker
        visible={customerVisible}
        customers={customers}
        selectedCustomer={selectedCustomer}
        onDismiss={() => setCustomerVisible(false)}
        onSelect={setSelectedCustomer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    ...Platform.select({
      web: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
      },
    }),
  },

  headerContainer: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
  },

  body: {
    flex: 1,
    overflow: 'hidden',
  },

  keyboardView: {
    flex: 1,
  },

  scroll: {
    flex: 1,
    ...Platform.select({
      web: {
        overflowY: 'auto',
      },
    }),
  },

  content: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },

  footer: {
    padding: SPACING.xl,
    gap: SPACING.md,
    backgroundColor: COLORS.background,
  },

  selectorCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },

  inputWrapper: {
    marginBottom: SPACING.md,
  },

  paymentContainer: {
    gap: SPACING.md,
  },

  dashedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.primary30 || 'rgba(255, 0, 84, 0.3)',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: SPACING.sm,
  },

  dashedButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
