import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Text
  from '../common/Text';

import {
  COLORS,
  SPACING,
  RADIUS,
  FONT_FAMILY,
} from '../../theme';

const TABS = [
  {
    key: 'login',
    label: 'Entrar',
  },

  {
    key: 'register',
    label: 'Cadastrar',
  },
];

export default function AuthTabs({
  activeTab,
  onPressLogin,
  onPressRegister,
}) {
  const handlers = {
    login: onPressLogin,
    register: onPressRegister,
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const active = tab.key === activeTab;

        const Component = active
          ? View
          : TouchableOpacity;

        return (
          <Component
            key={tab.key}
            style={[
              styles.tab,
              active &&
                styles.activeTab,
            ]}
            onPress={
              !active
                ? handlers[tab.key]
                : undefined
            }
          >
            <Text
              style={
                active
                  ? styles.activeText
                  : styles.inactiveText
              }
            >
              {tab.label}
            </Text>
          </Component>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING.xs,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceSecondary,
    marginBottom: SPACING.xl,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
  },

  activeTab: {
    backgroundColor: COLORS.surface,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  activeText: {
    color: COLORS.text,
    fontFamily: FONT_FAMILY.robotoBold,
  },

  inactiveText: {
    color: COLORS.textSecondary,
    fontFamily: FONT_FAMILY.robotoMedium,
  },
});