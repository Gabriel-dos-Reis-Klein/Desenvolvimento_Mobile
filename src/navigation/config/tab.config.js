import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';

export const TAB_ICONS = {
  Pedidos: 'shirt',
  Clientes: 'users',
};

export const styleOptions = {
  tabBarActiveTintColor: COLORS.primary,

  tabBarInactiveTintColor:
    COLORS.textSecondary,

  tabBarStyle: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  tabBarItemStyle: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
    height: 60,
  },

  tabBarLabelStyle: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.xs,
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
      size,
    }) => (
      <FontAwesome6
        name={TAB_ICONS[route.name]}
        size={size}
        color={color}
        solid={focused}
      />
    ),
  };
}