import { useEffect, useState, useMemo, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SPACING } from '../../theme';

import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import PasswordConfirmModal from '../../components/common/PasswordConfirmModal';
import Tabs from '../../components/common/Tabs';

import OrderCard from '../../components/orders/OrderCard'; 

import CustomerNameSection from '../../components/customers/CustomerNameSection';
import CustomerPhoneSection from '../../components/customers/CustomerPhoneSection';
import CustomerDescSection from '../../components/customers/CustomerDescSection';

import { customerSchema } from '../../validations/customer.validation';
import { customerService, orderService, userService } from '../../services';
import { showError } from '../../errors/showError';
import { showSuccess } from '../../errors/showSuccess';

const maskPhone = (value) => {
  if (!value) return '';
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length <= 10) {
    return cleanValue
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 14);
  }
  
  return cleanValue
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .substring(0, 15);
};

export default function CustomerDetails({ navigation, route }) {
  const { customerId } = route.params || {};

  const [activeTab, setActiveTab] = useState('DADOS'); 
  const [pedidos, setPedidos] = useState([]);

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [descricao, setDescricao] = useState('');
  
  const [errors, setErrors] = useState({});
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const isSavingOrNavigatingRef = useRef(false);

  const [initialState, setInitialState] = useState({
    nome: '',
    telefone: '',
    descricao: '',
  });

  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const customerTabsConfig = useMemo(() => [
    { id: 'DADOS', label: 'Dados Gerais' },
    { id: 'PEDIDOS', label: 'Pedidos', count: pedidos.length }
  ], [pedidos.length]);

  const loadCustomerData = async () => {
    try {
      setLoading(true);
      
      const [customerData, ordersData] = await Promise.all([
        customerService.getById(customerId),
        orderService.getByCustomer(customerId)
      ]);
      
      const formattedName = customerData.nome || '';
      const formattedTelephone = maskPhone(customerData.telefone || '');
      const formattedDescription = customerData.descricao || '';
      
      setNome(formattedName);
      setTelefone(formattedTelephone);
      setDescricao(formattedDescription);
      setPedidos(ordersData || []);

      setInitialState({
        nome: formattedName,
        telefone: formattedTelephone,
        descricao: formattedDescription,
      });

    } catch (error) {
      showError(error);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomerData();
  }, [customerId]);

  useEffect(() => {
    if (route.params?.shouldRefresh) {
      loadCustomerData();
      navigation.setParams({ shouldRefresh: undefined });
    }
  }, [route.params?.shouldRefresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      isSavingOrNavigatingRef.current = false;
    });
    return unsubscribe;
  }, [navigation]);

  const isModified = useMemo(() => {
    return (
      nome !== initialState.nome ||
      telefone !== initialState.telefone ||
      descricao !== initialState.descricao
    );
  }, [nome, telefone, descricao, initialState]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!isModified || isSavingOrNavigatingRef.current) {
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
  }, [navigation, isModified]);

  const handlePhoneChange = (text) => {
    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
    setTelefone(maskPhone(text));
  };

  const handleSaveChanges = async () => {
    setErrors({});
    
    const result = customerSchema.safeParse({
      name: nome,
      phone: telefone,
      description: descricao,
    });

    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        formattedErrors[path] = issue.message;
      });
      
      setErrors(formattedErrors);
      setActiveTab('DADOS'); 
      
      const firstMessage = result.error.issues[0].message;
      Alert.alert('Erro de validação', firstMessage);
      return;
    }

    try {
      setSaveLoading(true);
      isSavingOrNavigatingRef.current = true;
      
      const payload = {
        nome: result.data.name,
        telefone: result.data.phone,
        descricao: result.data.description,
      };

      await customerService.update(customerId, payload); 

      setInitialState({
        nome,
        telefone,
        descricao
      });

      showSuccess('Alterações salvas com sucesso!');
    } catch (error) {
      isSavingOrNavigatingRef.current = false;
      showError(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const executeCustomerDeletion = async (password) => {
    setPasswordModalVisible(false);
    try {
      setDeleteLoading(true);
      isSavingOrNavigatingRef.current = true;
      const validation = await userService.passwordConfirm({ senha: password });

      if (validation && validation.valido) {
        await customerService.remove(customerId);
        showSuccess('Cliente excluído com sucesso!', () => {
          navigation.navigate('Main');
        });
      } else {
        isSavingOrNavigatingRef.current = false;
        Alert.alert('Erro', 'Senha incorreta. Ação cancelada.');
      }
    } catch (error) {
      isSavingOrNavigatingRef.current = false;
      showError(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.headerContainer}>
        <PageHeader title="Detalhes do Cliente" onBack={() => navigation.goBack()} />
      </View>

      <Tabs 
        tabs={customerTabsConfig} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <View style={styles.body}>
        {activeTab === 'DADOS' ? (
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
              <CustomerNameSection
                nome={nome}
                onNameChange={(text) => {
                  if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                  setNome(text);
                }}
                editable={true}
                error={errors.name}
              />
              <CustomerPhoneSection
                telefone={telefone}
                onPhoneChange={handlePhoneChange}
                editable={true}
                error={errors.phone}
              />
              <CustomerDescSection
                descricao={descricao}
                onDescChange={(text) => {
                  if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
                  setDescricao(text);
                }}
                editable={true}
                error={errors.description}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <ScrollView 
            style={styles.scroll} 
            contentContainerStyle={styles.ordersContent}
            showsVerticalScrollIndicator={false}
          >
            {pedidos.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhum pedido encontrado para este cliente.</Text>
              </View>
            ) : (
              pedidos.map((pedido) => (
                <OrderCard 
                  key={pedido.id} 
                  order={pedido}
                  onPress={() => {
                    isSavingOrNavigatingRef.current = true;
                    navigation.navigate('OrderDetails', { orderId: pedido.id });
                  }}
                />
              ))
            )}
          </ScrollView>
        )}
      </View>

      {activeTab === 'DADOS' && (
        <View style={styles.footer}>
          <Button 
            title="Salvar Alterações" 
            disabled={!isModified} 
            loading={saveLoading}
            onPress={handleSaveChanges} 
          />
          <Button 
            title="Excluir Cliente" 
            variant="secondary" 
            style={styles.btnDelete}
            textColor={COLORS.error || '#ff3b30'}
            onPress={() => setPasswordModalVisible(true)} 
          />
        </View>
      )}

      <PasswordConfirmModal
        visible={passwordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        onConfirm={executeCustomerDeletion}
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
  ordersContent: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
    gap: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyText: {
    color: '#586069',
    fontSize: 15,
    textAlign: 'center',
  },
  footer: { 
    padding: SPACING.xl, 
    gap: SPACING.md, 
    backgroundColor: COLORS.background 
  },
});