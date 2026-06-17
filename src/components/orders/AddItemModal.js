import { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Portal, Modal, Divider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import Input from '../common/Input';
import Button from '../common/Button';
import Text from '../common/Text';

import {
  COLORS,
  SPACING,
  RADIUS,
  FONT_FAMILY,
} from '../../theme';

export default function AddItemModal({
  visible,
  onDismiss,
  onAdd,
}) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('CONFECCAO');

  const [dataPrazo, setDataPrazo] = useState(null);
  const [dataEntrega, setDataEntrega] = useState(null);
  const [dataProva, setDataProva] = useState(null);

  const [activeDate, setActiveDate] = useState(null);

  const openDate = (type) => {
    setActiveDate(type);
  };

  const handleDateChange = (event, selectedDate) => {
    if (event?.type === 'dismissed') {
      setActiveDate(null);
      return;
    }

    if (!selectedDate) return;

    switch (activeDate) {
      case 'PRAZO':
        setDataPrazo(selectedDate);
        break;
      case 'ENTREGA':
        setDataEntrega(selectedDate);
        break;
      case 'PROVA':
        setDataProva(selectedDate);
        break;
    }

    setActiveDate(null);
  };

  const formatDate = (date) =>
    date ? date.toLocaleDateString() : '';

  const handleAdd = () => {
    if (!titulo || !valor) return;

    onAdd({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      valor: Number(valor),
      imagem: [],
      dataPrazo,
      dataEntrega,
      dataProva,
      tipo,
    });

    setTitulo('');
    setDescricao('');
    setValor('');
    setTipo('CONFECCAO');
    setDataPrazo(null);
    setDataEntrega(null);
    setDataProva(null);

    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        {/* HEADER */}
        <Text style={styles.title}>
          Novo Item
        </Text>

        <Divider style={styles.divider} />

        {/* CONTENT SCROLL */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          <View style={styles.form}>
            <Input
              label="Título"
              value={titulo}
              onChangeText={setTitulo}
            />

            <Input
              label="Descrição"
              type="textarea"
              value={descricao}
              onChangeText={setDescricao}
            />

            <Input
              label="Valor (R$)"
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
            />

            {/* DATAS */}
            <View style={styles.dateGroup}>
              <Input
                label="Prazo"
                value={formatDate(dataPrazo)}
                placeholder="Selecionar prazo"
                editable={false}
                onPressIn={() => openDate('PRAZO')}
              />

              <Input
                label="Entrega"
                value={formatDate(dataEntrega)}
                placeholder="Selecionar entrega"
                editable={false}
                onPressIn={() => openDate('ENTREGA')}
              />

              <Input
                label="Prova"
                value={formatDate(dataProva)}
                placeholder="Selecionar prova"
                editable={false}
                onPressIn={() => openDate('PROVA')}
              />
            </View>
          </View>
        </ScrollView>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <Button title="Adicionar" onPress={handleAdd} />
          <Button
            title="Cancelar"
            variant="secondary"
            onPress={onDismiss}
          />
        </View>

        {/* DATE PICKER (ÚNICO E CONTROLADO) */}
        {activeDate && (
          <DateTimePicker
            key={activeDate}
            value={
              activeDate === 'PRAZO'
                ? dataPrazo || new Date()
                : activeDate === 'ENTREGA'
                ? dataEntrega || new Date()
                : dataProva || new Date()
            }
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: COLORS.background,
    margin: SPACING.lg,
    borderRadius: RADIUS.xl,
    maxHeight: '85%',
    overflow: 'hidden',
  },

  title: {
    fontFamily: FONT_FAMILY.poppinsBold,
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: SPACING.md,
  },

  divider: {
    backgroundColor: COLORS.border,
  },

  scroll: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },

  form: {
    gap: SPACING.md,
  },

  dateGroup: {
    gap: SPACING.sm,
  },

  actions: {
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
});