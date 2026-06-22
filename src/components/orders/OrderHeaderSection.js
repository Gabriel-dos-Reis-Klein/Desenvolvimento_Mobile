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
          activeOpacity={0.7}
        >
          <Text variant="small" color={COLORS.textSecondary} style={styles.label}>
            Cliente
          </Text>
          
          <Text variant="body" style={styles.customerName}>
            {selectedCustomer ? selectedCustomer.nome : 'Selecionar cliente'}
          </Text>
          
          {!!selectedCustomer && !!selectedCustomer.telefone && (
            <Text variant="small" color={COLORS.textSecondary} style={styles.phoneText}>
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
  container: {},
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  selectorWrapper: {
    marginBottom: SPACING.md,
  },
  wrapperWithError: {
    marginBottom: SPACING.xl,
  },
  selectorCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  label: {
    marginBottom: 4,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text || '#000000',
  },
  phoneText: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.textSecondary || '#666666',
  },
  errorText: {
    color: COLORS.error || '#ff3b30',
    fontSize: 12,
    marginLeft: SPACING.xs,
  },
});