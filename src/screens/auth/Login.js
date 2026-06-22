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
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

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
            onPressRegister={() =>
              navigation.replace('Register')
            }
          />

          <Input
            label="Email"
            value={form.values.email}
            onChangeText={(t) =>
              form.setField('email', t)
            }
            keyboardType="email-address"
            autoCapitalize="none"
            error={form.errors.email}
          />

          <Input
            type="password"
            label="Senha"
            value={form.values.password}
            onChangeText={(t) =>
              form.setField('password', t)
            }
            error={form.errors.password}
          />

          <Button
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