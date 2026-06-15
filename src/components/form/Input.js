import { TextInput, HelperText } from 'react-native-paper';

import {
  COLORS,
  SPACING,
} from '../../theme';

export default function Input({
  label,
  value,
  onChangeText,
  error,
  style,
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
        style={[
          {
            marginBottom: error
              ? 0
              : SPACING.md,
            backgroundColor:
              COLORS.surface,
          },
          style,
        ]}
        {...props}
      />

      {!!error && (
        <HelperText
          type="error"
          visible
        >
          {error}
        </HelperText>
      )}
    </>
  );
}