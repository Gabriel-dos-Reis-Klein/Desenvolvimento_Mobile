import { useState } from 'react';
import { StyleSheet } from 'react-native';

import {
  TextInput,
  HelperText,
} from 'react-native-paper';

import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
  COLORS,
  SPACING,
} from '../../theme';

export default function PasswordInput({
  label = 'Senha',
  value,
  onChangeText,
  error,
  style,
  ...props
}) {
  const [hidden, setHidden] = useState(true);

  return (
    <>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={hidden}
        error={!!error}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary40}
        style={[
          styles.input,
          {
            marginBottom: error ? 0 : SPACING.md,
          },
          style,
        ]}
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

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.surface,
  },
});