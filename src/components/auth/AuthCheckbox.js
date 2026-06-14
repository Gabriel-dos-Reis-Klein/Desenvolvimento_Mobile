import {
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import Text from '../common/Text';

import {
  COLORS,
  RADIUS,
  SPACING,
} from '../../theme';

export default function AuthCheckbox({
  checked,
  onPress,
  label,
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View
        style={[
          styles.box,
          checked && styles.checked,
        ]}
      >
        {checked && (
          <MaterialCommunityIcons
            name="check"
            size={16}
            color={COLORS.white}
          />
        )}
      </View>

      <Text>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },

  box: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xs,
    marginRight: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checked: {
    backgroundColor: COLORS.primary60,
  },
});