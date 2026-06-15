import { useState } from 'react';

import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  COLORS,
  SPACING,
} from '../../theme';

import PageHeader
  from '../../components/common/PageHeader';

import Input
  from '../../components/form/Input';

import Button
  from '../../components/form/Button';

import {
  useForm,
} from '../../hooks';

import {
  customerSchema,
} from '../../validations/customer.validation';

import {
  customerService,
} from '../../services';

import {
  showError,
} from '../../errors/showError';

import {
  showSuccess,
} from '../../errors/showSuccess';

export default function CreateCustomer({
  navigation,
}) {
  const [loading, setLoading] =
    useState(false);

  const form = useForm(
    customerSchema,
    {
      name: '',
      phone: '',
      description: '',
    }
  );

  const handleCreateCustomer =
    async () => {
      const data =
        form.validate();

      if (!data) return;

      try {
        setLoading(true);

        await customerService.create({
          nome: data.name,
          telefone: data.phone,
          descricao:
            data.description,
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
          contentContainerStyle={
            styles.scrollContent
          }
        >
          <PageHeader
            title="Criar Cliente"
            onBack={() =>
              navigation.goBack()
            }
          />

          <Input
            label="Nome"
            value={
              form.values.name
            }
            onChangeText={(text) =>
              form.setField(
                'name',
                text
              )
            }
            error={
              form.errors.name
            }
          />

          <Input
            label="Telefone"
            value={
              form.values.phone
            }
            onChangeText={(text) =>
              form.setField(
                'phone',
                text
              )
            }
            error={
              form.errors.phone
            }
            keyboardType="phone-pad"
          />

          <Input
            label="Descrição"
            value={
              form.values.description
            }
            onChangeText={(text) =>
              form.setField(
                'description',
                text
              )
            }
            error={
              form.errors.description
            }
            multiline
            numberOfLines={8}
            textAlignVertical="top"
            style={
              styles.descriptionInput
            }
          />

          <Button
            title="Cadastrar Cliente"
            loading={loading}
            onPress={
              handleCreateCustomer
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal:
      SPACING.xl,
    paddingVertical:
      SPACING.xl,
  },

  descriptionInput: {
    height: 250,
  },
});