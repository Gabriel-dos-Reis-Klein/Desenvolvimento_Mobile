import { TextInput, HelperText } from 'react-native-paper';

import {
  COLORS,
  SPACING,
} from '../../theme';

export default function AuthInput({
  label,
  value,
  onChangeText,
  error,
  ...props
}) {
  return (
    <>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        error={!!error}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary40}
        style={{
          marginBottom: error ? 0 : SPACING.md,
          backgroundColor: COLORS.surface,
        }}
        {...props}
      />

      {!!error && (
        <HelperText type="error" visible={true}>
          {error}
        </HelperText>
      )}
    </>
  );
}