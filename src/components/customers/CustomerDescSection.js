import { View, StyleSheet } from 'react-native';
import Input from '../common/Input';
import { COLORS, SPACING } from '../../theme';

export default function CustomerHeaderSection({ 
  descricao, 
  onDescChange,
  errorDesc       
}) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Input
          label="Descrição"
          type='textarea'
          value={descricao}
          onChangeText={onDescChange}
          error={errorDesc}
        />
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

