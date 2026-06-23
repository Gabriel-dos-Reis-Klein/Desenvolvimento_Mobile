import { FAB as PaperFAB }
  from 'react-native-paper';

import {
  COLORS,
  SPACING,
  RADIUS,
} from '../../theme';

export default function Fab({
  icon = 'plus',
  onPress,
  style,
  ...props
}) {
  return (
    <PaperFAB
      icon={icon}
      mode="flat"
      color='white'
      onPress={onPress}
      style={[
        styles.fab,
        style,
      ]}
      {...props}
    />
  );
}

const styles = {
  fab: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.xl,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    elevation: 6,
  },
};