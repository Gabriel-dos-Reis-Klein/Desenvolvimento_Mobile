import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {
  COLORS,
  SPACING,
} from '../../themes';

export default function Loading({
  size = 'large',
  color = COLORS.primary,
  containerStyle,
  style,
  ...props
}) {
  return (
    <View
      style={[
        styles.container,
        containerStyle,
      ]}
    >
      <ActivityIndicator
        size={size}
        color={color}
        style={style}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.xl,

    justifyContent: 'center',
    alignItems: 'center',
  },
});