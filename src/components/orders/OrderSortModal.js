import {
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import BottomSheet
  from '../common/BottomSheet';

import Text
  from '../common/Text';

import {
  COLORS,
  SPACING,
} from '../../themes';

const OPTIONS = [
  {
    label: 'Ordem alfabética',
    value: 'alphabetical',
  },

  {
    label: 'Prazo de entrega',
    value: 'deadline',
  },

  {
    label: 'Cliente do pedido',
    value: 'customer',
  },
];

export default function OrderSortModal({
  visible,
  onClose,

  selectedSort,
  setSelectedSort,
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
        Ordenar por
      </Text>

      {OPTIONS.map((option) => {
        const active =
          selectedSort === option.value;

        return (
          <TouchableOpacity
            key={option.value}
            style={styles.option}
            onPress={() =>
              setSelectedSort(
                option.value
              )
            }
          >
            <Text>
              {option.label}
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

  option: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    marginBottom:
      SPACING.xl,
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