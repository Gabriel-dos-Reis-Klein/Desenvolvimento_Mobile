import {
  TextInput,
} from 'react-native-paper';

import {
  COLORS,
  SPACING,
} from '../../theme';

export default function AuthInput({
  label,
  value,
  onChangeText,
  ...props
}) {
  return (
    <TextInput
      mode="outlined"
      label={label}
      value={value}
      onChangeText={onChangeText}
      outlineColor={COLORS.border}
      activeOutlineColor={COLORS.primary40}
      style={{
        marginBottom: SPACING.md,
        backgroundColor: COLORS.surface,
      }}
      {...props}
    />
  );
}