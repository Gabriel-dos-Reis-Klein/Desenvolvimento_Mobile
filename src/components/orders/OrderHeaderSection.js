import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Input from '../common/Input';
import Text from '../common/Text';
import { COLORS, SPACING } from '../../theme';

export default function OrderHeaderSection({ 
  title, 
  onTitleChange, 
  selectedCustomer, 
  onSelectCustomer,
  errorTitle,       
  errorCustomer     
}) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Input
          label="Título do Pedido"
          value={title}
          onChangeText={onTitleChange}
          error={errorTitle} 
        />
      </View>

      {/* Se houver erro, aplica a margem estendida (styles.wrapperWithError) */}
      <View style={[
        styles.selectorWrapper, 
        !!errorCustomer ? styles.wrapperWithError : null
      ]}>
        <TouchableOpacity 
          style={[
            styles.selectorCard, 
            !!errorCustomer ? { borderColor: COLORS.error || '#ff3b30' } : null 
          ]} 
          onPress={onSelectCustomer}
        >
          <Text variant="small" color={COLORS.textSecondary}>
            Cliente
          </Text>
          <Text variant="body">
            {selectedCustomer ? selectedCustomer.nome : 'Selecionar cliente'}
          </Text>
          {!!selectedCustomer && (
            <Text variant="small" color={COLORS.textSecondary}>
              {selectedCustomer.telefone}
            </Text>
          )}
        </TouchableOpacity>

        {!!errorCustomer ? (
          <Text style={styles.errorText}>
            {errorCustomer}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Mantém o espaçamento geral da seção limpo
  },
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  selectorWrapper: {
    marginBottom: SPACING.md, // Espaçamento padrão normal quando está tudo certo
  },
  wrapperWithError: {
    marginBottom: SPACING.xl, // Aumenta consideravelmente o espaçamento se houver erro
  },
  selectorCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.xs, // Margem pequena para separar o card do texto do erro
  },
  errorText: {
    color: COLORS.error || '#ff3b30',
    fontSize: 12,
    marginLeft: SPACING.xs,
  },
});