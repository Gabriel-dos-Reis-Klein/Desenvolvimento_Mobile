import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import Text
  from '../common/Text';

import {
  COLORS,
  SPACING,
  RADIUS,
  FONT_FAMILY,
} from '../../themes';

export default function FilterOption({
  label,
  icon,
  color,
  selected,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconBox,
          color && {
            backgroundColor: color,
          },
        ]}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={COLORS.black80}
          />
        )}
      </View>

      <Text
        style={styles.label}
      >
        {label}
      </Text>

      <View
        style={[
          styles.radio,
          selected &&
            styles.radioSelected,
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal:
      SPACING.xl,

    paddingVertical:
      SPACING.md,
  },

  iconBox: {
    width: 46,
    height: 46,

    borderRadius:
      RADIUS.md,

    backgroundColor:
      COLORS.black05,

    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    flex: 1,

    marginLeft:
      SPACING.md,

    fontFamily:
      FONT_FAMILY.poppinsMedium,
  },

  radio: {
    width: 24,
    height: 24,

    borderRadius: 999,

    borderWidth: 2,
    borderColor:
      COLORS.black30,
  },

  radioSelected: {
    borderColor:
      COLORS.primary,

    backgroundColor:
      COLORS.primary,
  },
});