import { useState } from 'react';

import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SPACING } from '../../theme';

import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

import { useForm } from '../../hooks';

import { customerSchema } from '../../validations/customer.validation';

import { customerService } from '../../services';

import { showError } from '../../errors/showError';
import { showSuccess } from '../../errors/showSuccess';

import { formatPhone } from '../../utils/phoneMask';

export default function CreateCustomer({ navigation }) {
  const [loading, setLoading] = useState(false);

  const form = useForm(customerSchema, {
    name: '',
    phone: '',
    description: '',
  });

  const setField = (field) => (value) => {
    form.setField(field, value);
  };

  const handlePhoneChange = (text) => {
    form.setField('phone', formatPhone(text));
  };

  const handleCreateCustomer = async () => {
    const data = form.validate();
    if (!data) return;

    try {
      setLoading(true);

      await customerService.create({
        nome: data.name,
        telefone: data.phone,
        descricao: data.description,
      });

      showSuccess(
        'Cliente cadastrado com sucesso!',
        () => navigation.goBack()
      );
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
          title="Criar Cliente"
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
              value={form.values.name}
              onChangeText={setField('name')}
              error={form.errors.name}
            />

            <Input
              label="Telefone"
              value={form.values.phone}
              onChangeText={handlePhoneChange}
              error={form.errors.phone}
              keyboardType="phone-pad"
            />

            <Input
              label="Descrição"
              type='textarea'
              value={form.values.description}
              onChangeText={setField('description')}
              error={form.errors.description}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <View style={styles.footer}>
        <Button
          title="Cadastrar"
          loading={loading}
          onPress={handleCreateCustomer}
        />
        <Button 
          title="Cancelar" 
          variant="secondary" 
          onPress={() => navigation.goBack()} 
          disabled={loading}
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
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
      },
    }),
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: 0,
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
    ...Platform.select({
      web: { overflowY: 'auto' },
    }),
  },
  content: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
    gap: SPACING.lg,
    flexGrow: 1,
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? 0 : SPACING.xl,
    gap: SPACING.md,
    backgroundColor: COLORS.background,
  },
});