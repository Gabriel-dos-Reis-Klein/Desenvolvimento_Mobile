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

import CustomerNameSection from '../../components/customers/CustomerNameSection';
import CustomerPhoneSection from '../../components/customers/CustomerPhoneSection';
import CustomerDescSection from '../../components/customers/CustomerDescSection';

import { customerService, userService } from '../../services';
import { showError } from '../../errors/showError';
import { showSuccess } from '../../errors/showSuccess';

export default function OrderDetails({ navigation, route }) {
  const { customerId } = route.params || {};

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [descricao, setDescricao] = useState('');
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [isSavingOrNavigating, setIsSavingOrNavigating] = useState(false);

  const [initialState, setInitialState] = useState({
    nome: '',
    telefone: '',
    descricao: '',
  });

  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadCustomerDetails = async () => {
    try {
      setLoading(true);
      const data = await customerService.getById(customerId);
      
      const formattedName = data.nome || '';
      const formattedTelephone = data.telefone || '';
      const formattedDescription = data.descricao || '';
      
      setNome(formattedName);
      setTelefone(formattedTelephone);
      setDescricao(formattedDescription);

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
    loadCustomerDetails();
  }, [customerId]);

  useEffect(() => {
    if (route.params?.shouldRefresh) {
      loadCustomerDetails();
      navigation.setParams({ shouldRefresh: undefined });
    }
  }, [route.params?.shouldRefresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsSavingOrNavigating(false);
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

  const handleSaveChanges = async () => {
    try {
      setSaveLoading(true);
      setIsSavingOrNavigating(true);
      
      const payload = {
        nome: nome,
        telefone: telefone,
        descricao: descricao,
      };

      const response = await customerService.update(customerId, payload); 

      setInitialState({
        nome,
        telefone,
        descricao
      });

      showSuccess('Alterações salvas com sucesso!');
    } catch (error) {
      setIsSavingOrNavigating(false);
      showError(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const executeCustomerDeletion = async (password) => {
    setPasswordModalVisible(false);
    try {
      setDeleteLoading(true);
      setIsSavingOrNavigating(true);
      const validation = await userService.passwordConfirm({ senha: password });

      if (validation && validation.valido) {
        await customerService.remove(customerId);
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
        <PageHeader title="Detalhes do Cliente" onBack={() => navigation.goBack()} />
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
            <CustomerNameSection
              nome={nome}
              onNameChange={setNome}
              editable={true}
            />
            <CustomerPhoneSection
              telefone={telefone}
              onPhoneChange={setTelefone}
              editable={true}
            />
            <CustomerDescSection
              descricao={descricao}
              onDescChange={setDescricao}
              editable={true}
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
  footer: { 
    padding: SPACING.xl, 
    gap: SPACING.md, 
    backgroundColor: COLORS.background 
  },
  btnDelete: { 
    borderColor: COLORS.error || '#ff3b30' 
  }
});