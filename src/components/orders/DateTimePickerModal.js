import { Platform, Modal, Pressable, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, SPACING, FONT_FAMILY } from '../../theme';

export default function DateTimePickerModal({
  visible,
  date,
  mode,
  onChange,
  onConfirmIOS,
  onCancelIOS,
}) {
  if (!visible) return null;

  const pickerComponent = (
    <DateTimePicker
      value={Platform.OS === 'ios' ? date : (date || new Date())}
      mode={mode}
      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
      accentColor={COLORS.primary}
      textColor={Platform.OS === 'ios' ? '#000000' : COLORS.text}
      onChange={onChange}
    />
  );

  if (Platform.OS === 'ios') {
    return (
      <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onCancelIOS}>
        <Pressable style={styles.modalOverlay} onPress={onCancelIOS}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Pressable onPress={onCancelIOS}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={onConfirmIOS}>
                <Text style={[styles.modalConfirmText, { color: COLORS.primary }]}>Confirmar</Text>
              </Pressable>
            </View>
            <View style={styles.pickerWrapper}>{pickerComponent}</View>
          </View>
        </Pressable>
      </Modal>
    );
  }

  return pickerComponent;
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.surface || '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderColor: COLORS.border || '#E9ECEF',
  },
  modalCancelText: {
    fontSize: 15,
    fontFamily: FONT_FAMILY?.poppinsMedium || 'System',
    color: COLORS.textSecondary || '#6C757D',
  },
  modalConfirmText: {
    fontSize: 15,
    fontFamily: FONT_FAMILY?.poppinsSemiBold || 'System',
  },
  pickerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface || '#FFFFFF',
  },
});