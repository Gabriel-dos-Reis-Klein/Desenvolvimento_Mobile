import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  COLORS,
  RADIUS,
  SPACING,
} from '../../themes';

export default function BottomSheet({
  visible,
  onClose,
  children,
}) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.container}
        >
          <View style={styles.handle} />

          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    justifyContent: 'flex-end',

    backgroundColor:
      'rgba(0,0,0,0.35)',
  },

  container: {
    backgroundColor:
      COLORS.surface,

    borderTopLeftRadius:
      RADIUS.xl,

    borderTopRightRadius:
      RADIUS.xl,

    padding:
      SPACING.lg,
  },

  handle: {
    alignSelf: 'center',

    width: 60,
    height: 6,

    borderRadius: 999,

    backgroundColor:
      COLORS.black20,

    marginBottom:
      SPACING.lg,
  },
});