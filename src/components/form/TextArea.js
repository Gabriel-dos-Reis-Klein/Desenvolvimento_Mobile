import { useState, useEffect } from 'react';

import { StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

import { COLORS, SPACING } from '../../theme';

const MIN_HEIGHT = 80;
const MAX_HEIGHT = 250;

export default function TextArea({
  label,
  value,
  onChangeText,
  error,
  style,
  ...props
}) {
  const [height, setHeight] = useState(MIN_HEIGHT);

  // volta ao tamanho inicial quando limpa
  useEffect(() => {
    if (!value?.trim()) {
      setHeight(MIN_HEIGHT);
    }
  }, [value]);

  const handleContentSizeChange = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;

    const nextHeight = Math.min(
      Math.max(MIN_HEIGHT, contentHeight),
      MAX_HEIGHT
    );

    setHeight(nextHeight);
  };

  return (
    <>
      <TextInput
        mode="outlined"
        multiline
        label={label}
        value={value}
        onChangeText={onChangeText}
        onContentSizeChange={handleContentSizeChange}
        error={!!error}
        textAlignVertical="top"
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary40}
        scrollEnabled={height >= MAX_HEIGHT}
        contentStyle={{
          paddingTop: 12,
        }}
        style={[
          styles.input,
          { height },
          style,
        ]}
        {...props}
      />

      {!!error && (
        <HelperText type="error" visible>
          {error}
        </HelperText>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
  },
});