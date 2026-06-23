import { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Alert,
  Text as RNText,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { COLORS, SPACING } from '../../theme';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

import { useForm } from '../../hooks';
import { newUserSchema } from '../../validations/settings.validation';

import { userService } from '../../services';
import { showError } from '../../errors/showError';
import { showSuccess } from '../../errors/showSuccess';

const PERMISSIONS = [
  { value: 'FUNCIONARIO', label: 'Funcionário' },
  { value: 'ADMIN', label: 'Administrador' },
];

export default function CreateUser({ navigation }) {
  const [loading, setLoading] = useState(false);

  const form = useForm(newUserSchema, {
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    permissao: 'FUNCIONARIO',
  });

  const isFormModified = useMemo(
    () =>
      form.values.nome !== '' ||
      form.values.email !== '' ||
      form.values.senha !== '' ||
      form.values.confirmarSenha !== '',
    [form.values]
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!isFormModified) return;
      e.preventDefault();
      Alert.alert(
        'Alterações não salvas',
        'Deseja sair e descartar as informações preenchidas?',
        [
          { text: 'Continuar', style: 'cancel' },
          {
            text: 'Descartar e sair',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });
    return unsubscribe;
  }, [navigation, isFormModified]);

  const handleCreate = async () => {
    const data = form.validate();
    if (!data) return;
    try {
      setLoading(true);
      await userService.register({
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        permissao: data.permissao,
      });
      showSuccess('Usuário cadastrado com sucesso!', () => navigation.goBack());
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <PageHeader
          title="Novo Usuário"
          onBack={() => navigation.goBack()}
        />
      </View>

      <View style={styles.body}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.scroll}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <Input
              label="Nome"
              value={form.values.nome}
              onChangeText={(v) => form.setField('nome', v)}
              error={form.errors.nome}
            />

            <Input
              label="E-mail"
              value={form.values.email}
              onChangeText={(v) => form.setField('email', v)}
              keyboardType="email-address"
              autoCapitalize="none"
              error={form.errors.email}
            />

            <Input
              type="password"
              label="Senha"
              value={form.values.senha}
              onChangeText={(v) => form.setField('senha', v)}
              error={form.errors.senha}
            />

            <Input
              type="password"
              label="Confirmar senha"
              value={form.values.confirmarSenha}
              onChangeText={(v) => form.setField('confirmarSenha', v)}
              error={form.errors.confirmarSenha}
            />

            {/* Seletor de permissão */}
            <View style={styles.permissionGroup}>
              <RNText style={styles.permissionLabel}>Permissão</RNText>
              <View style={styles.permissionOptions}>
                {PERMISSIONS.map((p) => {
                  const active = form.values.permissao === p.value;
                  return (
                    <TouchableOpacity
                      key={p.value}
                      style={[
                        styles.permissionOption,
                        active && styles.permissionOptionActive,
                      ]}
                      onPress={() => form.setField('permissao', p.value)}
                      activeOpacity={0.7}
                    >
                      <FontAwesome6
                        name={active ? 'circle-dot' : 'circle'}
                        size={16}
                        color={active ? COLORS.primary : COLORS.textMuted}
                      />
                      <RNText
                        style={[
                          styles.permissionOptionText,
                          active && styles.permissionOptionTextActive,
                        ]}
                      >
                        {p.label}
                      </RNText>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {!!form.errors.permissao && (
                <RNText style={styles.permissionError}>
                  {form.errors.permissao}
                </RNText>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <View style={styles.footer}>
        <Button
          title="Cadastrar usuário"
          loading={loading}
          onPress={handleCreate}
        />
        <Button
          title="Cancelar"
          variant="secondary"
          disabled={loading}
          onPress={() => navigation.goBack()}
        />
      </View>
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
        top: 0, left: 0, right: 0, bottom: 0,
        height: '100%', width: '100%',
      },
    }),
  },
  header: {
    paddingHorizontal: SPACING.md,
  },
  body: {
    flex: 1,
    overflow: 'hidden',
  },
  keyboardView: { flex: 1 },
  scroll: {
    flex: 1,
    ...Platform.select({ web: { overflowY: 'auto' } }),
  },
  content: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
    flexGrow: 1,
  },

  // Permission selector
  permissionGroup: {
    gap: SPACING.sm,
  },
  permissionLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  permissionOptions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  permissionOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surfaceSecondary,
  },
  permissionOptionActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary10,
  },
  permissionOptionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  permissionOptionTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  permissionError: {
    fontSize: 12,
    color: '#B00020',
    marginTop: 2,
  },

  footer: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? 0 : SPACING.xl,
    gap: SPACING.md,
    backgroundColor: COLORS.background,
  },
});
