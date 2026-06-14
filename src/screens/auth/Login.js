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

import AuthCheckbox
  from '../../components/auth/AuthCheckbox';

import AuthButton
  from '../../components/auth/AuthButton';

import {
  COLORS,
  SPACING,
} from '../../theme';

export default function Login({
  navigation,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      navigation.navigate('Main');
    } catch (error) {
      console.error(error);
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
            title="Comece Agora"
          />

          <AuthTabs
            activeTab="login"
            onPressLogin={() => {}}
            onPressRegister={() =>
              navigation.replace(
                'Register'
              )
            }
          />

          <AuthInput
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AuthPasswordInput
            value={password}
            onChangeText={setPassword}
          />

          <AuthCheckbox
            label="Lembrar-me"
            checked={rememberMe}
            onPress={() =>
              setRememberMe(
                !rememberMe
              )
            }
          />

          <AuthButton
            title="Entrar"
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