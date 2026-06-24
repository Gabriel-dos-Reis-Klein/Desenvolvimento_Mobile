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
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

import { COLORS, SPACING } from '../../theme';

import { useForm } from '../../hooks';
import { registerSchema } from '../../validations/auth.validation';

import { userService } from '../../services';
import { showError } from '../../errors/showError';

import { AuthContext } from '../../contexts/AuthContext';

export default function Register({ navigation }) {
  const form = useForm(registerSchema, {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const data = form.validate();
    if (!data) return;

    try {
      setLoading(true);

      await userService.create({
        nome: data.name,
        email: data.email,
        senha: data.password,
      });

      const response = await userService.login({
        email: data.email,
        senha: data.password,
      });

      const token = response?.token;

      if (token) {
        await signIn({ token });
        
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          });
        }, 50);
        
        return;
      }

      navigation.replace('Login');

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
          <AuthHeader title="Junte-se a nós" />

          <AuthTabs
            activeTab="register"
            onPressLogin={() => navigation.replace('Login')}
            onPressRegister={() => {}}
          />

          <Input
            label="Nome"
            value={form.values.name}
            onChangeText={(text) =>
              form.setField('name', text)
            }
            error={form.errors.name}
          />

          <Input
            label="E-mail"
            value={form.values.email}
            onChangeText={(text) =>
              form.setField('email', text)
            }
            error={form.errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            type="password"
            label="Senha"
            value={form.values.password}
            onChangeText={(text) =>
              form.setField('password', text)
            }
            error={form.errors.password}
          />

          <Input
            type="password"
            label="Confirmar senha"
            value={form.values.confirmPassword}
            onChangeText={(text) =>
              form.setField('confirmPassword', text)
            }
            error={form.errors.confirmPassword}
          />

          <Button
            title="Cadastrar-se"
            loading={loading}
            onPress={handleRegister}
            style={styles.button}
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

  button:{
    marginTop: SPACING.md,
  },
});