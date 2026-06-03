import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import BottomSheet
  from '../common/BottomSheet';

import Text
  from '../common/Text';

import {
  COLORS,
  SPACING,
} from '../../theme';

import { 
  ORDER_TYPE_LABELS,
  ORDER_STATUS_LABELS
} from '../../constants';

const TYPES = [
  null,
  ORDER_TYPE_LABELS.MANUFACTURING,
  ORDER_TYPE_LABELS.REPAIR,
  ORDER_TYPE_LABELS.MODIFICATION
];

const STATUS = [
  null,
  ORDER_STATUS_LABELS.WAITING,
  ORDER_STATUS_LABELS.PRODUCTION,
  ORDER_STATUS_LABELS.DELIVERED,
];

export default function OrderFilterModal({
  visible,
  onClose,

  selectedType,
  setSelectedType,

  selectedStatus,
  setSelectedStatus,
}) {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
    >
      <Text
        variant="h2"
        style={styles.title}
      >
        Filtrar por
      </Text>

      <Text style={styles.sectionTitle}>
        Tipo
      </Text>

      {TYPES.map((item) => {
        const active =
          selectedType === item;

        return (
          <TouchableOpacity
            key={String(item)}
            style={styles.option}
            onPress={() =>
              setSelectedType(item)
            }
          >
            <Text>
              {item || 'Todos'}
            </Text>

            <View
              style={[
                styles.radio,

                active &&
                  styles.radioActive,
              ]}
            />
          </TouchableOpacity>
        );
      })}

      <Text style={styles.sectionTitle}>
        Estado
      </Text>

      {STATUS.map((item) => {
        const active =
          selectedStatus === item;

        return (
          <TouchableOpacity
            key={String(item)}
            style={styles.option}
            onPress={() =>
              setSelectedStatus(item)
            }
          >
            <Text>
              {item || 'Todos'}
            </Text>

            <View
              style={[
                styles.radio,

                active &&
                  styles.radioActive,
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',

    marginBottom:
      SPACING.xl,
  },

  sectionTitle: {
    marginBottom:
      SPACING.md,

    fontWeight: '700',
  },

  option: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    marginBottom:
      SPACING.lg,
  },

  radio: {
    width: 24,
    height: 24,

    borderRadius: 999,

    borderWidth: 2,

    borderColor:
      COLORS.black30,
  },

  radioActive: {
    borderColor:
      COLORS.primary,

    backgroundColor:
      COLORS.primary,
  },
});