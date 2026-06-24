import { useEffect, useState, useMemo, useRef, useContext } from 'react';
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
import Input from '../../components/common/Input'; 

import { editProfileSchema } from '../../validations/settings.validation';
import { userService } from '../../services';
import { AuthContext } from '../../contexts/AuthContext';
import { showError } from '../../errors/showError';

export default function EditProfile({ navigation }) {
  const { user, refreshUser } = useContext(AuthContext); 

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  
  const [errors, setErrors] = useState({});
  const isSavingOrNavigatingRef = useRef(false);

  const [initialState, setInitialState] = useState({
    nome: '',
    email: '',
  });

  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const userId = user?.id || user?.sub; 
      
      const profileData = await userService.getById(userId);
      
      const formattedName = profileData.nome || '';
      const formattedEmail = profileData.email || '';
      
      setNome(formattedName);
      setEmail(formattedEmail);

      setInitialState({
        nome: formattedName,
        email: formattedEmail,
      });
    } catch (error) {
      showError(error);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      isSavingOrNavigatingRef.current = false;
    });
    return unsubscribe;
  }, [navigation]);

  const isModified = useMemo(() => {
    return (
      nome.trim() !== initialState.nome ||
      email.trim().toLowerCase() !== initialState.email
    );
  }, [nome, email, initialState]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!isModified || isSavingOrNavigatingRef.current) {
        return;
      }
      e.preventDefault();
      Alert.alert(
        'Alterações não salvas',
        'Você possui alterações no seu perfil que não foram salvas. Deseja realmente descartar?',
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

  const handleSaveChanges = async () => {
    setErrors({});
    
    const result = editProfileSchema.safeParse({
      nome: nome,
      email: email,
    });

    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        formattedErrors[path] = issue.message;
      });
      
      setErrors(formattedErrors);
      
      const firstMessage = result.error.issues[0].message;
      Alert.alert('Erro de validação', firstMessage);
      return;
    }

    try {
      setSaveLoading(true);
      isSavingOrNavigatingRef.current = true;

      const payload = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
      };

      const updatedUserFromServer = await userService.updateMe(payload); 

      setInitialState({
        nome: updatedUserFromServer.nome || payload.nome,
        email: updatedUserFromServer.email || payload.email,
      });

      refreshUser(updatedUserFromServer);

      Alert.alert(
        'Sucesso',
        'Os dados do seu perfil foram atualizados com sucesso.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      isSavingOrNavigatingRef.current = false;
      console.log('Detalhes do erro na requisição:', error?.response?.data || error);
      Alert.alert(
        'Falha na Atualização',
        error?.response?.data?.message || 'Não foi possível atualizar seus dados. Tente novamente mais tarde.'
      );
    } finally {
      setSaveLoading(false);
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
        <PageHeader title="Editar Perfil" onBack={() => navigation.goBack()} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <View style={styles.body}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={styles.scroll}
            contentContainerStyle={styles.content}
          >
            <Input
              label="Nome Completo"
              value={nome}
              onChangeText={(text) => {
                if (errors.nome) setErrors(prev => ({ ...prev, nome: undefined }));
                setNome(text);
              }}
              error={errors.nome}
              placeholder="Digite seu nome"
            />

            <Input
              label="E-mail"
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => {
                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                setEmail(text);
              }}
              error={errors.email}
              placeholder="seu.email@provedor.com"
            />
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <Button 
            title="Salvar Perfil" 
            disabled={!isModified || saveLoading} 
            loading={saveLoading}
            onPress={handleSaveChanges} 
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: { 
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xs,
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: COLORS.background 
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
    paddingVertical: SPACING.xl, 
    flexGrow: 1, 
    gap: SPACING.md 
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