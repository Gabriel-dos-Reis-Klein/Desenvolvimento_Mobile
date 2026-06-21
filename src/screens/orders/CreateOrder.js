import { useMemo, useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SPACING } from '../../theme';

import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';

import CustomerPicker from '../../components/orders/CustomerPicker';
import OrderSummaryCard from '../../components/orders/OrderSummaryCard';
import OrderHeaderSection from '../../components/orders/OrderHeaderSection';
import OrderPaymentSection from '../../components/orders/OrderPaymentSection';
import OrderItemsListSection from '../../components/orders/OrderItemsListSection';

import { customerService, orderService } from '../../services';
import { showError } from '../../errors/showError';
import { showSuccess } from '../../errors/showSuccess';

// Validações com Zod
import { orderSchema } from '../../validations/order.validation';
import { validateSchema } from '../../validations/validation.utils';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const formatCurrency = (value) => {
  const cleanValue = value.replace(/\D/g, '');
  if (!cleanValue) return '';
  const numberValue = Number(cleanValue) / 100;
  return numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const parseCurrencyToNumber = (formattedValue) => {
  if (!formattedValue) return 0;
  return Number(formattedValue.replace(/\D/g, '')) / 100;
};

export default function CreateOrder({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [items, setItems] = useState([]);
  const [advance, setAdvance] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [loading, setLoading] = useState(false);
  const [customerVisible, setCustomerVisible] = useState(false);

  const [orderErrors, setOrderErrors] = useState({});

  useEffect(() => {
    if (route.params?.savedItem) {
      const { savedItem, savedIndex } = route.params;

      setItems((prev) => {
        const updated = [...prev];
        if (savedIndex !== undefined && savedIndex !== null) {
          updated[savedIndex] = savedItem;
        } else {
          updated.push(savedItem);
        }
        return updated;
      });

      if (orderErrors.itens) setOrderErrors((prev) => ({ ...prev, itens: undefined }));
      navigation.setParams({ savedItem: undefined, savedIndex: undefined });
    }
  }, [route.params?.savedItem, route.params?.savedIndex]);

  const total = useMemo(() => {
    return items.reduce((acc, item) => {
      const value = Number(item.valor);
      return acc + (isNaN(value) ? 0 : value);
    }, 0);
  }, [items]);

  const loadCustomers = async () => {
    try {
      const data = await customerService.getAll();
      setCustomers(data);
    } catch (error) {
      showError(error);
    }
  };

  const handleOpenCustomerPicker = () => {
    if (orderErrors.idCliente) setOrderErrors((prev) => ({ ...prev, idCliente: undefined }));
    loadCustomers();
    setCustomerVisible(true);
  };

  const handleEditItem = (item, index) => {
    navigation.navigate('ItemForm', {
      mode: 'edit',
      item,
      index,
    });
  };

  const handleDeleteItem = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDuplicateItem = (item, index) => {
    const copy = {
      ...item,
      titulo: `${item.titulo} (cópia)`,
    };

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setItems((prev) => {
      const updated = [...prev];
      updated.splice(index + 1, 0, copy);
      return updated;
    });
  };

  const handleAddItem = () => {
    navigation.navigate('ItemForm', {
      mode: 'create',
    });
  };

  const handleAdvanceChange = (text) => {
    if (orderErrors.pagamentoAntecipado) {
      setOrderErrors((prev) => ({ ...prev, pagamentoAntecipado: undefined }));
    }
    setAdvance(formatCurrency(text));
  };

  const handlePaymentTypeChange = (type) => {
    if (orderErrors.tipoPagamento) {
      setOrderErrors((prev) => ({ ...prev, tipoPagamento: undefined }));
    }
    setPaymentType(type);
  };

  const handleCreate = async () => {
    const payload = {
      titulo: title,
      itens: items,
      idCliente: selectedCustomer?.id || '',
      pagamentoAntecipado: parseCurrencyToNumber(advance),
      tipoPagamento: paymentType,
    };

    const validation = validateSchema(orderSchema, payload);

    if (!validation.success) {
      setOrderErrors(validation.errors);
      
      if (validation.errors.itens) {
         showError(validation.errors.itens);
      }
      return;
    }

    setOrderErrors({});

    try {
      setLoading(true);
      await orderService.create(validation.data);
      showSuccess('Pedido criado com sucesso!', () => navigation.goBack());
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <PageHeader title="Criar Pedido" onBack={() => navigation.goBack()} />
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
            <OrderHeaderSection
              title={title}
              onTitleChange={(text) => {
                if (orderErrors.titulo) setOrderErrors((prev) => ({ ...prev, titulo: undefined }));
                setTitle(text);
              }}
              selectedCustomer={selectedCustomer}
              onSelectCustomer={handleOpenCustomerPicker}
              errorTitle={orderErrors.titulo}
              errorCustomer={orderErrors.idCliente}
            />

            <OrderSummaryCard
              quantity={items.length}
              total={total}
              advance={parseCurrencyToNumber(advance)}
            />

            <OrderPaymentSection
              paymentType={paymentType}
              onPaymentTypeChange={handlePaymentTypeChange}
              advance={advance}
              onAdvanceChange={handleAdvanceChange}
              errorPaymentType={orderErrors.tipoPagamento}
              errorAdvance={orderErrors.pagamentoAntecipado}
            />

            <OrderItemsListSection
              items={items}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
              onDuplicateItem={handleDuplicateItem}
              onAddItem={handleAddItem}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <View style={styles.footer}>
        <Button title="Criar Pedido" loading={loading} onPress={handleCreate} />
        <Button title="Cancelar" variant="secondary" onPress={() => navigation.goBack()} />
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
      web: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: '100%', width: '100%' },
    }),
  },
  headerContainer: { paddingHorizontal: SPACING.md },
  body: { flex: 1, overflow: 'hidden' },
  keyboardView: { flex: 1 },
  scroll: {
    flex: 1,
    ...Platform.select({ web: { overflowY: 'auto' } }),
  },
  content: { paddingHorizontal: SPACING.xl, paddingVertical: SPACING.xl, flexGrow: 1 },
  footer: { padding: SPACING.xl, gap: SPACING.md, backgroundColor: COLORS.background },
});