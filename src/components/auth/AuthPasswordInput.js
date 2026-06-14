import {
  useState,
} from 'react';

import {
  TextInput,
} from 'react-native-paper';

import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
  COLORS,
  SPACING,
} from '../../theme';

export default function AuthPasswordInput({
  value,
  onChangeText,
  ...props
}) {
  const [hidden, setHidden] =
    useState(true);

  return (
    <TextInput
      mode="outlined"
      label="Senha"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={hidden}
      outlineColor={COLORS.border}
      activeOutlineColor={COLORS.primary40}
      style={{
        marginBottom: SPACING.md,
        backgroundColor: COLORS.surface,
      }}
      right={
        <TextInput.Icon
          icon={() => (
            <MaterialCommunityIcons
              name={
                hidden
                  ? 'eye'
                  : 'eye-off'
              }
              size={20}
            />
          )}
          onPress={() =>
            setHidden(!hidden)
          }
        />
      }
      {...props}
    />
  );
}