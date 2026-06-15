import { useState, useContext } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import AuthHeader from '../../components/auth/AuthHeader';
import AuthTabs from '../../components/auth/AuthTabs';
import AuthInput from '../../components/auth/AuthInput';
import AuthPasswordInput from '../../components/auth/AuthPasswordInput';
import AuthButton from '../../components/auth/AuthButton';

import { COLORS, SPACING } from '../../theme';

import { useForm } from '../../hooks';
import { loginSchema } from '../../validations/auth.validation';

import { userService } from '../../services';
import { showError } from '../../errors/showError';

import { AuthContext } from '../../contexts/AuthContext';

export default function Login({ navigation }) {
  const form = useForm(loginSchema, {
    email: '',
    password: '',
  });

  const { signIn } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const data = form.validate();
    if (!data) return;

    try {
      setLoading(true);

      const response = await userService.login({
        email: data.email,
        senha: data.password,
      });

      await signIn({
        token: response.token,
      });

    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <AuthHeader title="Comece Agora" />

          <AuthTabs
            activeTab="login"
            onPressLogin={() => {}}
            onPressRegister={() => navigation.replace('Register')}
          />

          <AuthInput
            label="E-mail"
            value={form.values.email}
            onChangeText={(text) => form.setField('email', text)}
            error={form.errors.email}
          />

          <AuthPasswordInput
            value={form.values.password}
            onChangeText={(text) => form.setField('password', text)}
            error={form.errors.password}
          />

          <AuthButton
            title="Entrar"
            loading={loading}
            onPress={handleLogin}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
  },
});