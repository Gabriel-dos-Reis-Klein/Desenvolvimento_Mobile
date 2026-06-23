import { useState } from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import {
  HelperText,
  TextInput,
} from 'react-native-paper';

import {
  COLORS,
  SPACING,
} from '../../theme';

const MIN_HEIGHT = 80;
const MAX_HEIGHT = 250;

export default function Input({
  label,
  value,
  type = 'text',
  onChangeText,
  mode = 'flat',
  error,
  style,
  ...props
}) {
  const [secure, setSecure] =
    useState(true);

  const [height, setHeight] =
    useState(MIN_HEIGHT);

  const isPassword =
    type === 'password';

  const isTextArea =
    type === 'textarea';

  const handleContentSizeChange = (
    event
  ) => {
    if (!isTextArea) return;

    const contentHeight =
      event.nativeEvent.contentSize
        .height;

    if (!value?.trim()) {
      setHeight(MIN_HEIGHT);
      return;
    }

    const nextHeight = Math.min(
      Math.max(
        MIN_HEIGHT,
        contentHeight + 8
      ),
      MAX_HEIGHT
    );

    setHeight(nextHeight);
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode={mode}
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={
          isPassword ? secure : false
        }
        multiline={isTextArea}
        numberOfLines={
          isTextArea ? 3 : 1
        }
        onContentSizeChange={
          handleContentSizeChange
        }
        error={!!error}
        textAlignVertical={
          isTextArea
            ? 'top'
            : 'center'
        }

        underlineColor={COLORS.border}
        activeUnderlineColor={COLORS.primary}
        
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}

        right={
          isPassword ? (
            <TextInput.Icon
              icon={
                secure
                  ? 'eye'
                  : 'eye-off'
              }
              onPress={() =>
                setSecure(
                  (prev) => !prev
                )
              }
            />
          ) : null
        }
        style={[
          styles.input,

          isTextArea && {
            minHeight: MIN_HEIGHT,
            maxHeight: MAX_HEIGHT,

            ...(Platform.OS !==
              'web' && {
              height,
            }),
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
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginBottom: SPACING.md,
    },

    input: {
      backgroundColor:
        COLORS.surface,
    },
  });