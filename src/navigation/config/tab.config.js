import {
  View,
  StyleSheet,
} from 'react-native';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';
import { FONT_FAMILY } from '../../theme';

export const TAB_ICONS = {
  Pedidos: 'shirt',
  Clientes: 'users',
};

export const styleOptions = {
  tabBarActiveTintColor:
    COLORS.primary,

  tabBarInactiveTintColor:
    COLORS.textSecondary,

  tabBarStyle: {
    height: 72,

    backgroundColor:
      COLORS.surface,

    borderTopWidth: 1,

    borderTopColor:
      COLORS.black05,

    elevation: 8,

    paddingTop: 6,
    paddingBottom: 6,
  },

  tabBarItemStyle: {
    paddingVertical:
      SPACING.xs,
  },

  tabBarLabelStyle: {
    ...TYPOGRAPHY.caption,

    fontFamily:
      FONT_FAMILY.robotoBold,

    fontSize: 12,

    letterSpacing: 1,

    marginTop: 5,
  },
};

export function createScreenOptions({
  route,
}) {
  return {
    headerShown: false,

    ...styleOptions,

    tabBarIcon: ({
      focused,
      color,
    }) => (
      <View
        style={[
          styles.iconContainer,

          focused &&
            styles.iconContainerActive,
        ]}
      >
        <FontAwesome6
          name={TAB_ICONS[route.name]}
          size={18}
          color={color}
          solid={focused}
        />
      </View>
    ),
  };
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 64,
    height: 32,

    borderRadius: 999,

    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainerActive: {
    backgroundColor:
      COLORS.primary20,
  },
});