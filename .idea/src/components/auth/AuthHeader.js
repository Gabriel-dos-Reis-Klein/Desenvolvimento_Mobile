import {
  View,
  StyleSheet,
} from 'react-native';

import {
  FontAwesome6,
} from '@expo/vector-icons';

import Text from '../common/Text';

import {
  COLORS,
  SPACING,
  RADIUS,
} from '../../theme';

import StitchLine from '../common/StitchLine';

// TODO: trocar ícone de tesoura pela logo

export default function AuthHeader({
  title,
}) {
  return (
    <>
      <View style={styles.header}>
        
        <StitchLine/>

        <View style={styles.iconContainer}>
          <FontAwesome6
            name="scissors"
            size={28}
            color={COLORS.white}
          />
        </View>

        <StitchLine/>
      </View>

      <Text
        variant="h1"
        style={styles.title}
      >
        {title}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },

  iconContainer: {
    marginHorizontal: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
  },

  title: {
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
});