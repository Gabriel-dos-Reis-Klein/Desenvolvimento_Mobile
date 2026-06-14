import {
  useState,
} from 'react';

import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import AuthHeader
  from '../../components/auth/AuthHeader';

import AuthTabs
  from '../../components/auth/AuthTabs';

import AuthInput
  from '../../components/auth/AuthInput';

import AuthPasswordInput
  from '../../components/auth/AuthPasswordInput';

import AuthButton
  from '../../components/auth/AuthButton';

import {
  COLORS,
  SPACING,
} from '../../theme';

import {
  userService,
} from '../../services';

export default function Register({
  navigation,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('');

  const handleRegister =
    async () => {
      try {

        if (password !== confirmPassword) {
          alert('As senhas não coincidem');
          return;
        }

        await userService.create({
          nome: name,
          email,
          senha: password,
        });

        navigation.replace(
          'Login'
        );

      } catch (error) {
        console.error(error);

        alert(
          error.message ||
          'Erro ao cadastrar usuário'
        );
      }
    };

  return (
    <SafeAreaView
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.scrollContent
          }
        >
          <AuthHeader
            title="Junte-se a nós"
          />

          <AuthTabs
            activeTab="register"
            onPressLogin={() =>
              navigation.replace(
                'Login'
              )
            }
            onPressRegister={() => {}}
          />

          <AuthInput
            label="Nome"
            value={name}
            onChangeText={setName}
          />

          <AuthInput
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AuthPasswordInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
          />

          <AuthPasswordInput
            label="Confirmar senha"
            value={confirmPassword}
            onChangeText={
              setConfirmPassword
            }
          />

          <AuthButton
            title="Cadastrar-se"
            onPress={
              handleRegister
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
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