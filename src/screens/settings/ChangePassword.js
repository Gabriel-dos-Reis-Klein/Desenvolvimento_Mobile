import { useState, useMemo, useEffect, useRef } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SPACING } from '../../theme';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import PasswordConfirmModal from '../../components/common/PasswordConfirmModal';

import { useForm } from '../../hooks';
import { changePasswordSchema } from '../../validations/settings.validation';
import { userService } from '../../services';
import { showError } from '../../errors/showError';
import { showSuccess } from '../../errors/showSuccess';

export default function ChangePassword({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const isSavingOrNavigatingRef = useRef(false);

  const passwordForm = useForm(changePasswordSchema, {
    novaSenha: '',
    confirmarSenha: '',
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      isSavingOrNavigatingRef.current = false;
    });
    return unsubscribe;
  }, [navigation]);

  const isModified = useMemo(
    () => passwordForm.values.novaSenha !== '' || passwordForm.values.confirmarSenha !== '',
    [passwordForm.values.novaSenha, passwordForm.values.confirmarSenha]
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!isModified || isSavingOrNavigatingRef.current) {
        return;
      }
      e.preventDefault();
      Alert.alert(
        'Cancelar alteração',
        'Você digitou uma nova senha. Deseja realmente descartar e voltar?',
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

  // Primeiro passo: valida localmente os campos de nova senha
  const handleOpenConfirmModal = () => {
    const data = passwordForm.validate();
    if (!data) return;

    setPasswordModalVisible(true);
  };

  // Segundo passo: valida a senha atual e salva a nova
  const executePasswordUpdate = async (currentPassword) => {
    try {
      setLoading(true);
      
      // 1. Valida se a senha atual está correta no backend
      const validation = await userService.passwordConfirm({ senha: currentPassword });

      if (validation && validation.valido) {
        isSavingOrNavigatingRef.current = true;
        setPasswordModalVisible(false);

        // 2. Com a senha validada, envia a nova senha para atualização
        await userService.updatePassword({ senha: passwordForm.values.novaSenha });
        
        showSuccess('Sua senha foi alterada com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro de Autenticação', 'Senha atual incorreta. A alteração foi cancelada.');
      }
    } catch (error) {
      isSavingOrNavigatingRef.current = false;
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <PageHeader title="Segurança" onBack={() => navigation.goBack()} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.body}>
          <ScrollView 
            keyboardShouldPersistTaps="handled" 
            showsVerticalScrollIndicator={false}
            style={styles.scroll}
            contentContainerStyle={styles.content}
          >
            <View>
              <View style={styles.inputsContainer}>
                <Input
                  type="password"
                  label="Nova senha de acesso"
                  value={passwordForm.values.novaSenha}
                  placeholder="Digite sua nova senha"
                  onChangeText={(v) => passwordForm.setField('novaSenha', v)}
                  error={passwordForm.errors.novaSenha}
                />
                <Input
                  type="password"
                  label="Confirme a nova senha"
                  value={passwordForm.values.confirmarSenha}
                  placeholder="Confirme a nova senha"
                  onChangeText={(v) => passwordForm.setField('confirmarSenha', v)}
                  error={passwordForm.errors.confirmarSenha}
                />
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <Button
            title="Alterar Senha"
            loading={loading && !passwordModalVisible}
            disabled={!isModified || loading}
            onPress={handleOpenConfirmModal}
          />
        </View>
      </KeyboardAvoidingView>

      <PasswordConfirmModal
        visible={passwordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        onConfirm={executePasswordUpdate}
        loading={loading}
        title="Confirmar Alteração"
        description="Para atualizar sua senha de acesso com segurança, por favor digite sua senha atual abaixo."
        buttonTitle="Confirmar e Salvar"
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  header: { 
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xs,
  },
  keyboardView: { 
    flex: 1 
  },
  body: {
    flex: 1,
    overflow: 'hidden'
  },
  scroll: {
    flex: 1,
  },
  content: { 
    paddingHorizontal: SPACING.xl, 
    paddingVertical: SPACING.xl 
  },
  inputsContainer: { 
    gap: SPACING.sm 
  },
  footer: { 
    paddingHorizontal: SPACING.xl, 
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background,
    ...Platform.select({
      ios: {
        paddingBottom: SPACING.xl,
      }
    })
  }
});