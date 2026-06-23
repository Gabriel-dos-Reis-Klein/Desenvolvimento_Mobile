import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  FontAwesome5,
} from '@expo/vector-icons';

import {
  COLORS,
  RADIUS,
} from '../../theme';

export default function FilterButton({
  icon,
  onPress,
  iconSize = 24,
  iconColor = COLORS.black70,
  style,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      <FontAwesome5
        name={icon}
        size={iconSize}
        color={iconColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 55,
    height: 55,

    borderRadius: RADIUS.md,

    borderWidth: 1,
    borderColor: COLORS.border,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: COLORS.surface,
  },
});