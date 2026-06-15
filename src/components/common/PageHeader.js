import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import {
  COLORS,
  SPACING,
  FONT_FAMILY,
} from '../../theme';

export default function PageHeader({
  title,
  onBack,
  rightComponent,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            hitSlop={10}
          >
            <FontAwesome6
              name="arrow-left"
              size={20}
              color={COLORS.text}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text
        numberOfLines={1}
        style={styles.title}
      >
        {title}
      </Text>

      <View style={styles.side}>
        {rightComponent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },

  side: {
    width: 32,
    alignItems: 'center',
  },

  title: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 22,
    fontFamily: FONT_FAMILY.robotoBold,
  },
});