import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Menu, Divider } from 'react-native-paper';

import {
  COLORS,
  FONT_FAMILY,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '../../theme';

export default function PaymentSelector({ value, onChange }) {
  const [visible, setVisible] = useState(false);

  const getLabel = () => {
    switch (value) {
      case 'PIX':
        return 'PIX';
      case 'DINHEIRO':
        return 'Dinheiro';
      case 'CARTAO':
        return 'Cartão';
      default:
        return 'Selecionar';
    }
  };

  const getIcon = () => {
    switch (value) {
      case 'PIX':
        return 'qrcode';
      case 'DINHEIRO':
        return 'cash';
      case 'CARTAO':
        return 'credit-card';
      default:
        return 'cash';
    }
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentStyle={styles.menu}
        anchor={
          <Chip
            icon={getIcon()}
            onPress={() => setVisible(true)}
            style={styles.chip}
            textStyle={styles.chipText}
          >
            {getLabel()}
          </Chip>
        }
      >
        <Menu.Item
          title="PIX"
          leadingIcon="qrcode"
          onPress={() => {
            onChange('PIX');
            setVisible(false);
          }}
        />

        <Divider />

        <Menu.Item
          title="Dinheiro"
          leadingIcon="cash"
          onPress={() => {
            onChange('DINHEIRO');
            setVisible(false);
          }}
        />

        <Divider />

        <Menu.Item
          title="Cartão"
          leadingIcon="credit-card"
          onPress={() => {
            onChange('CARTAO');
            setVisible(false);
          }}
        />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },

  chip: {
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.full,
  },

  chipText: {
    ...TYPOGRAPHY.small,
    fontFamily: FONT_FAMILY.robotoMedium,
    color: COLORS.text,
  },

  menu: {
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
  },
});