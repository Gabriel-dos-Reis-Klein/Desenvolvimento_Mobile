import { useState } from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import { COLORS, SPACING } from '../../theme';

const MIN_HEIGHT = 80;
const MAX_HEIGHT = 250;

export default function Input({
  label,
  value,
  type = 'text',
  onChangeText,
  error,
  style,
  ...props
}) {
  const [secure, setSecure] = useState(true);
  const [height, setHeight] = useState(MIN_HEIGHT);

  const isPassword = type === 'password';
  const isTextArea = type === 'textarea';

  const handleContentSizeChange = (event) => {
    if (!isTextArea) return;

    const contentHeight = event.nativeEvent.contentSize.height;

    const nextHeight = Math.min(
      Math.max(MIN_HEIGHT, contentHeight + 10),
      MAX_HEIGHT
    );

    setHeight(nextHeight);
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword ? secure : false}
        multiline={isTextArea}
        onContentSizeChange={handleContentSizeChange}
        error={!!error}
        textAlignVertical={isTextArea ? 'top' : 'center'}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary40}
        right={
          isPassword ? (
            <TextInput.Icon
              icon={secure ? 'eye' : 'eye-off'}
              onPress={() => setSecure(!secure)}
            />
          ) : null
        }
        style={[
          styles.input,
          isTextArea && { height },
          style,
        ]}
        {...props}
      />

      {!!error && (
        <HelperText type="error" visible>
          {error}
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.surface,
  },

  container: {
    marginBottom: SPACING.md,
  }
});