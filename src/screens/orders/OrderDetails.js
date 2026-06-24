import { useEffect, useState, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SPACING } from '../../theme';

import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import PasswordConfirmModal from '../../components/common/PasswordConfirmModal';

import CustomerPicker from '../../components/orders/CustomerPicker';
import OrderSummaryCard from '../../components/orders/OrderSummaryCard';
import OrderHeaderSection from '../../components/orders/OrderHeaderSection';
import OrderPaymentSection from '../../components/orders/OrderPaymentSection';
import OrderItemsListSection from '../../components/orders/OrderItemsListSection';
import OrderStatusSelector from '../../components/orders/OrderStatusSelector';

import { customerService, orderService, userService } from '../../services';
import { showError } from '../../errors/showError';
import { showSuccess } from '../../errors/showSuccess';

const parseCurrencyToNumber = (amountString) => {
  if (!amountString) return 0;
  const cleanString = amountString.replace(/[R$\s.]/g, '').replace(',', '.');
  return parseFloat(cleanString) || 0;
};

const maskCurrency = (value) => {
  if (!value) return 'R$ 0,00';
  const cleanValue = value.replace(/\D/g, '');
  const numberValue = Number(cleanValue) / 100;
  return numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export default function OrderDetails({ navigation, route }) {
  const { orderId } = route.params || {};

  const [title, setTitle] = useState('');
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [items, setItems] = useState([]);
  const [advance, setAdvance] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [status, setStatus] = useState('PENDENTE');
  const [customerVisible, setCustomerVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [isSavingOrNavigating, setIsSavingOrNavigating] = useState(false);

  const [initialState, setInitialState] = useState({
    title: '',
    customerId: '',
    paymentType: '',
    status: 'PENDENTE',
    advance: '',
    items: [],
  });

  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await orderService.getById(orderId);
      
      const formattedTitle = data.titulo || '';
      const formattedPaymentType = data.tipoPagamento || '';
      const formattedStatus = data.statusPedido || 'PENDENTE';
      const formattedCustomer = {
        id: data.idCliente ? String(data.idCliente) : '',
        nome: data.nomeCliente || '',
        telefone: data.telefoneCliente || data.telefone || '',
      };
      
      let formattedAdvance = 'R$ 0,00';
      if (data.pagamentoAntecipado !== undefined && data.pagamentoAntecipado !== null) {
        const numericAdvance = Number(data.pagamentoAntecipado);
        formattedAdvance = isNaN(numericAdvance)
          ? 'R$ 0,00'
          : numericAdvance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      }

      const formattedItems = (data.itens || []).map(item => {
        const currentStatus = item.statusItemPedido || item.status || item.statusPedido || item.statusItem || 'PRODUCAO';
        const itemId = item.id || item.idItem || item._id || item.id_item;

        return {
          id: itemId,
          titulo: item.titulo || item.descricaoPeca || '',
          descricao: item.descricao || item.observacoes || '',
          valor: Number(item.valor) || 0,
          tipo: String(item.tipo || 'CONFECCAO').toUpperCase(),
          statusItemPedido: currentStatus,
          dataPrazo: item.dataPrazo ? new Date(item.dataPrazo).toISOString() : null,
          dataEntrega: item.dataEntrega ? new Date(item.dataEntrega).toISOString() : null,
          dataProva: item.dataProva ? new Date(item.dataProva).toISOString() : null,
          imagem: item.imagem || item.fotos || [],
        };
      });

      setTitle(formattedTitle);
      setItems(formattedItems);
      setPaymentType(formattedPaymentType);
      setStatus(formattedStatus);
      setSelectedCustomer(formattedCustomer);
      setAdvance(formattedAdvance);

      setInitialState({
        title: formattedTitle,
        customerId: data.idCliente ? String(data.idCliente) : '',
        paymentType: formattedPaymentType,
        status: formattedStatus,
        advance: formattedAdvance,
        items: JSON.parse(JSON.stringify(formattedItems)),
      });

    } catch (error) {
      showError(error);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const loadCustomers = async () => {
    try {
      const data = await customerService.getAll();
      setCustomers(data);
    } catch (error) {
      showError(error);
    }
  };

  const handleOpenCustomerPicker = () => {
    loadCustomers();
    setCustomerVisible(true);
  };

  const handleSelectCustomerFromPicker = (customer) => {
    setSelectedCustomer({
      id: customer.id ? String(customer.id) : '',
      nome: customer.nome,
      telefone: customer.telefone || '',
    });
    setCustomerVisible(false);
  };

  const handleDeleteItem = (indexToRemove) => {
    Alert.alert(
      'Remover Item',
      'Deseja realmente remover este item do pedido?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
          },
        },
      ]
    );
  };

  const handleDuplicateItem = (itemToDuplicate) => {
    const duplicated = {
      ...itemToDuplicate,
      id: undefined,
      titulo: `${itemToDuplicate.titulo || ''} (Cópia)`,
    };
    setItems((prevItems) => [...prevItems, duplicated]);
  };

  const handleItemStatusChange = (indexToUpdate, newStatus) => {
    const safeStatus = newStatus || 'PRODUCAO';
    setItems((prevItems) =>
      prevItems.map((item, index) =>
        index === indexToUpdate
          ? {
              ...item,
              statusItemPedido: safeStatus,
            }
          : item
      )
    );
  };

  useEffect(() => {
    loadOrderDetails();
  }, [orderId]);

  useEffect(() => {
    if (route.params?.shouldRefresh) {
      loadOrderDetails();
      navigation.setParams({ shouldRefresh: undefined });
    }
  }, [route.params?.shouldRefresh]);

  useEffect(() => {
    if (route.params?.savedItem && route.params?.savedIndex !== undefined) {
      const rawItem = route.params.savedItem;
      const indexToUpdate = route.params.savedIndex;
      const currentStatus = rawItem.statusItemPedido || rawItem.status || rawItem.statusPedido || 'PRODUCAO';
      const itemId = rawItem.id || rawItem.idItem || rawItem._id;

      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        
        let targetIndex = indexToUpdate;
        if (itemId) {
          const foundIndex = updatedItems.findIndex(i => i.id === itemId);
          if (foundIndex !== -1) targetIndex = foundIndex;
        }

        updatedItems[targetIndex] = {
          id: itemId || updatedItems[targetIndex]?.id,
          titulo: rawItem.titulo || '',
          descricao: rawItem.descricao || '',
          valor: Number(rawItem.valor) || 0,
          tipo: String(rawItem.tipo || 'CONFECCAO').toUpperCase(),
          statusItemPedido: currentStatus,
          dataPrazo: rawItem.dataPrazo ? new Date(rawItem.dataPrazo).toISOString() : null,
          dataEntrega: rawItem.dataEntrega ? new Date(rawItem.dataEntrega).toISOString() : null,
          dataProva: rawItem.dataProva ? new Date(rawItem.dataProva).toISOString() : null,
          imagem: rawItem.imagem || rawItem.fotos || [],
        };
        return updatedItems;
      });

      navigation.setParams({ savedItem: undefined, savedIndex: undefined });
    }
  }, [route.params?.savedItem, route.params?.savedIndex]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsSavingOrNavigating(false);
    });
    return unsubscribe;
  }, [navigation]);

  const total = useMemo(() => {
    return items.reduce((acc, item) => {
      const value = Number(item.valor);
      return acc + (isNaN(value) ? 0 : value);
    }, 0);
  }, [items]);

  const currentAdvanceNumber = useMemo(() => {
    return parseCurrencyToNumber(advance);
  }, [advance]);

  const dynamicSaldo = useMemo(() => {
    const remainder = total - currentAdvanceNumber;
    return remainder < 0 ? 0 : remainder;
  }, [total, currentAdvanceNumber]);

  const isModified = useMemo(() => {
    const currentCustomerId = selectedCustomer?.id ? String(selectedCustomer.id) : '';
    const initialCustomerId = initialState.customerId ? String(initialState.customerId) : '';

    return (
      title !== initialState.title ||
      currentCustomerId !== initialCustomerId ||
      paymentType !== initialState.paymentType ||
      status !== initialState.status ||
      advance !== initialState.advance ||
      JSON.stringify(items) !== JSON.stringify(initialState.items)
    );
  }, [title, selectedCustomer, paymentType, status, advance, items, initialState]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!isModified || isSavingOrNavigating) {
        return;
      }
      e.preventDefault();
      Alert.alert(
        'Alterações não salvas',
        'Você possui alterações que não foram salvas. Deseja realmente sair e descartar essas alterações?',
        [
          { text: 'Continuar editando', style: 'cancel', onPress: () => {} },
          {
            text: 'Descartar e sair',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });
    return unsubscribe;
  }, [navigation, isModified, isSavingOrNavigating]);

  const handleAdvanceChange = (text) => {
    setAdvance(maskCurrency(text));
  };

  const handleSaveChanges = async () => {
    try {
      setSaveLoading(true);
      setIsSavingOrNavigating(true);

      const sanitizedItems = items.map(item => {
        const currentStatus = item.statusItemPedido || 'PRODUCAO';
        const itemId = item.id || item.idItem || item._id || item.id_item;
        
        const cleanItem = {
          titulo: item.titulo || '',
          descricao: item.descricao || '',
          valor: Number(item.valor) || 0,
          statusItemPedido: currentStatus,
          imagem: item.imagem || [],
          dataPrazo: item.dataPrazo ? new Date(item.dataPrazo).toISOString() : null,
          dataEntrega: item.dataEntrega ? new Date(item.dataEntrega).toISOString() : null,
          dataProva: item.dataProva ? new Date(item.dataProva).toISOString() : null,
          tipo: String(item.tipo || 'CONFECCAO').toUpperCase(),
        };

        if (itemId) {
          cleanItem.id = itemId;
        }

        return cleanItem;
      });

      const payload = {
        titulo: title,
        itens: sanitizedItems,
        idCliente: selectedCustomer?.id || '',
        pagamentoAntecipado: currentAdvanceNumber,
        statusPedido: status,
        tipoPagamento: paymentType,
      };

      console.log("PAYLOAD ENVIADO PARA A API:", JSON.stringify(payload, null, 2));

      const response = await orderService.update(orderId, payload);
      
      console.log("RESPOSTA DA API:", response);

      if (response && response.itens) {
        const updatedFromResponse = response.itens.map((apiItem, idx) => {
          const apiStatus = apiItem.statusItemPedido || apiItem.status || 'PRODUCAO';
          const apiId = apiItem.id || items[idx]?.id;
          return {
            ...items[idx],
            id: apiId,
            statusItemPedido: apiStatus,
          };
        });
        setItems(updatedFromResponse);
        
        setInitialState({
          title,
          customerId: selectedCustomer?.id ? String(selectedCustomer.id) : '',
          paymentType,
          status,
          advance,
          items: JSON.parse(JSON.stringify(updatedFromResponse)),
        });
      } else {
        setInitialState({
          title,
          customerId: selectedCustomer?.id ? String(selectedCustomer.id) : '',
          paymentType,
          status,
          advance,
          items: JSON.parse(JSON.stringify(items)),
        });
      }

      showSuccess('Alterações salvas com sucesso!');
    } catch (error) {
      setIsSavingOrNavigating(false);
      showError(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const executeOrderDeletion = async (password) => {
    setPasswordModalVisible(false);
    try {
      setDeleteLoading(true);
      setIsSavingOrNavigating(true);
      const validation = await userService.passwordConfirm({ senha: password });

      if (validation && validation.valido) {
        await orderService.remove(orderId);
        showSuccess('Pedido excluído com sucesso!', () => {
          navigation.navigate('Main');
        });
      } else {
        setIsSavingOrNavigating(false);
        Alert.alert('Erro', 'Senha incorreta. Ação cancelada.');
      }
    } catch (error) {
      setIsSavingOrNavigating(false);
      showError(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleNavigateToItem = (mode, item = null, index = null) => {
    setIsSavingOrNavigating(true);
    setTimeout(() => {
      navigation.navigate('ItemForm', {
        mode,
        item,
        index,
        origin: 'OrderDetails',
      });
    }, 0);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <PageHeader title="Detalhes do Pedido" onBack={() => navigation.goBack()} />
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
              onTitleChange={setTitle}
              selectedCustomer={selectedCustomer}
              onSelectCustomer={handleOpenCustomerPicker} 
              editable={true}
            />

            <OrderStatusSelector 
              value={status} 
              onChange={setStatus} 
            />

            <OrderSummaryCard
              quantity={items.length}
              total={total}
              advance={currentAdvanceNumber}
              balance={dynamicSaldo}
            />

            <OrderPaymentSection
              paymentType={paymentType}
              onPaymentTypeChange={setPaymentType}
              advance={advance}
              onAdvanceChange={handleAdvanceChange}
            />

            <OrderItemsListSection
              items={items}
              onEditItem={(item, index) => handleNavigateToItem('edit', item, index)}
              onDeleteItem={(item, index) => handleDeleteItem(index)} 
              onDuplicateItem={(item) => handleDuplicateItem(item)} 
              onAddItem={() => handleNavigateToItem('create', null, items.length)} 
              onItemStatusChange={handleItemStatusChange}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <View style={styles.footer}>
        <Button 
          title="Salvar Alterações" 
          disabled={!isModified} 
          loading={saveLoading}
          onPress={handleSaveChanges} 
        />
        <Button 
          title="Excluir Pedido" 
          variant="secondary" 
          style={styles.btnDelete}
          textColor={COLORS.error || '#ff3b30'}
          onPress={() => setPasswordModalVisible(true)} 
        />
      </View>

      <CustomerPicker
        visible={customerVisible}
        customers={customers}
        selectedCustomer={selectedCustomer}
        onDismiss={() => setCustomerVisible(false)}
        onSelect={handleSelectCustomerFromPicker}
      />

      <PasswordConfirmModal
        visible={passwordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        onConfirm={executeOrderDeletion}
        loading={deleteLoading}
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
        width: '100%' 
      },
    }),
  },
  headerContainer: { 
    paddingHorizontal: SPACING.md 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: COLORS.background 
  },
  body: { 
    flex: 1, 
    overflow: 'hidden' 
  },
  keyboardView: { 
    flex: 1 
  },
  scroll: {
    flex: 1,
    ...Platform.select({ 
      web: { 
        overflowY: 'auto' 
      } 
    }),
  },
  content: { 
    paddingHorizontal: SPACING.xl, 
    paddingVertical: SPACING.xl, 
    flexGrow: 1, 
    gap: SPACING.md 
  },
  footer: { 
    padding: SPACING.xl, 
    gap: SPACING.md, 
    backgroundColor: COLORS.background 
  },
  btnDelete: { 
    borderColor: COLORS.error || '#ff3b30' 
  }
});