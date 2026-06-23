import { View, StyleSheet } from 'react-native';
import Input from '../common/Input';
import Text from '../common/Text';
import PaymentSelector from './PaymentSelector';
import OrderSection from './OrderSection';
import { COLORS, SPACING } from '../../theme';

export default function OrderPaymentSection({ 
  paymentType, 
  onPaymentTypeChange, 
  advance, 
  onAdvanceChange,
  errorPaymentType,
  errorAdvance
}) {
  return (
    <OrderSection title="Pagamento">
      <View style={styles.paymentContainer}>
        <PaymentSelector
          value={paymentType}
          onChange={onPaymentTypeChange}
        />
        
        {!!errorPaymentType && (
          <Text style={styles.errorText}>
            {errorPaymentType}
          </Text>
        )}

        <Input
          label="Entrada"
          keyboardType="numeric"
          value={advance}
          onChangeText={onAdvanceChange}
          error={errorAdvance}
        />
      </View>
    </OrderSection>
  );
}

const styles = StyleSheet.create({
  paymentContainer: {
    gap: SPACING.md,
  },
  errorText: {
    color: COLORS.error || '#ff3b30',
    fontSize: 12,
    marginTop: -SPACING.xs,
    marginLeft: SPACING.xs,
  },
});