import { useState, useContext, useMemo, useEffect } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Alert,
  Text as RNText,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SPACING } from '../../theme';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

import { useForm } from '../../hooks';
import {
  editProfileSchema,
  changePasswordSchema,
} from '../../validations/settings.validation';

import { userService } from '../../services';
import { showError } from '../../errors/showError';
import { showSuccess } from '../../errors/showSuccess';
import { AuthContext } from '../../contexts/AuthContext';

function SectionTitle({ label, style }) {
  return (
    <View style={[sectionStyles.container, style]}>
      <View style={sectionStyles.accent} />
      <RNText style={sectionStyles.text}>{label}</RNText>
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  accent: {
    width: 3,
    height: 14,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default function EditProfile({ navigation }) {
  const { user, refreshUser } = useContext(AuthContext);

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const profileForm = useForm(editProfileSchema, {
    nome: user?.nome ?? '',
    email: user?.email ?? '',
  });

  const passwordForm = useForm(changePasswordSchema, {
    novaSenha: '',
    confirmarSenha: '',
  });

  const isProfileModified = useMemo(
    () =>
      profileForm.values.nome !== (user?.nome ?? '') ||
      profileForm.values.email !== (user?.email ?? ''),
    [profileForm.values, user]
  );

  const isPasswordModified = useMemo(
    () =>
      passwordForm.values.novaSenha !== '' ||
      passwordForm.values.confirmarSenha !== '',
    [passwordForm.values]
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!isProfileModified && !isPasswordModified) return;
      e.preventDefault();
      Alert.alert(
        'Alterações não salvas',
        'Você possui alterações não salvas. Deseja sair e descartá-las?',
        [
          { text: 'Continuar editando', style: 'cancel' },
          {
            text: 'Descartar e sair',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });
    return unsubscribe;
  }, [navigation, isProfileModified, isPasswordModified]);

  const handleSaveProfile = async () => {
    const data = profileForm.validate();
    if (!data) return;
    try {
      setLoadingProfile(true);
      const updated = await userService.updateMe({
        nome: data.nome,
        email: data.email,
      });
      refreshUser(updated);
      showSuccess('Perfil atualizado com sucesso!');
    } catch (error) {
      showError(error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    const data = passwordForm.validate();
    if (!data) return;
    try {
      setLoadingPassword(true);
      await userService.updatePassword({ senha: data.novaSenha });
      passwordForm.reset();
      showSuccess('Senha alterada com sucesso!');
    } catch (error) {
      showError(error);
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <PageHeader title="Editar Perfil" onBack={() => navigation.goBack()} />
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
            {/* Dados pessoais */}
            <SectionTitle label="Dados pessoais" />

            <Input
              label="Nome"
              value={profileForm.values.nome}
              onChangeText={(v) => profileForm.setField('nome', v)}
              error={profileForm.errors.nome}
            />

            <Input
              label="E-mail"
              value={profileForm.values.email}
              onChangeText={(v) => profileForm.setField('email', v)}
              keyboardType="email-address"
              autoCapitalize="none"
              error={profileForm.errors.email}
            />

            <Button
              title="Salvar dados"
              loading={loadingProfile}
              disabled={!isProfileModified || loadingProfile}
              onPress={handleSaveProfile}
            />

            {/* Alterar senha */}
            <SectionTitle label="Alterar senha" style={styles.sectionGap} />

            <Input
              type="password"
              label="Nova senha"
              value={passwordForm.values.novaSenha}
              onChangeText={(v) => passwordForm.setField('novaSenha', v)}
              error={passwordForm.errors.novaSenha}
            />

            <Input
              type="password"
              label="Confirmar nova senha"
              value={passwordForm.values.confirmarSenha}
              onChangeText={(v) => passwordForm.setField('confirmarSenha', v)}
              error={passwordForm.errors.confirmarSenha}
            />

            <Button
              title="Alterar senha"
              loading={loadingPassword}
              disabled={!isPasswordModified || loadingPassword}
              onPress={handleChangePassword}
            />
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
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
  sectionGap: {
    marginTop: SPACING.lg,
  },
});
