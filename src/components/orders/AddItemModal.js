import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Portal, Modal, Divider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import Input from '../common/Input';
import Button from '../common/Button';
import Text from '../common/Text';

import { COLORS, SPACING, RADIUS, FONT_FAMILY } from '../../theme';

export default function AddItemModal({
  visible,
  item,
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

  useEffect(() => {
    if (!visible) return;

    if (item) {
      setTitulo(item.titulo || '');
      setDescricao(item.descricao || '');
      setValor(item.valor ? String(item.valor) : '');
      setTipo(item.tipo || 'CONFECCAO');

      setDataPrazo(item.dataPrazo ? new Date(item.dataPrazo) : null);
      setDataEntrega(item.dataEntrega ? new Date(item.dataEntrega) : null);
      setDataProva(item.dataProva ? new Date(item.dataProva) : null);

      return;
    }

    clearForm();
  }, [item, visible]);

  const clearForm = () => {
    setTitulo('');
    setDescricao('');
    setValor('');
    setTipo('CONFECCAO');
    setDataPrazo(null);
    setDataEntrega(null);
    setDataProva(null);
  };

  const openDate = (type) => setActiveDate(type);

  const handleDateChange = (event, selectedDate) => {
    if (event?.type !== 'set') {
      setActiveDate(null);
      return;
    }

    if (!selectedDate) return;

    if (activeDate === 'PRAZO') setDataPrazo(selectedDate);
    if (activeDate === 'ENTREGA') setDataEntrega(selectedDate);
    if (activeDate === 'PROVA') setDataProva(selectedDate);

    setActiveDate(null);
  };

  const formatDate = (date) =>
    date ? date.toLocaleDateString('pt-BR') : '';

  const handleSave = () => {
    if (!titulo.trim()) return;
    if (!valor || isNaN(Number(valor))) return;
    if (!tipo) return;

    onAdd({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      valor: Number(valor),
      tipo,
      imagem: [],

      dataPrazo: dataPrazo ? dataPrazo.toISOString() : null,
      dataEntrega: dataEntrega ? dataEntrega.toISOString() : null,
      dataProva: dataProva ? dataProva.toISOString() : null,
    });

    clearForm();
    onDismiss();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <Text style={styles.title}>
          {item ? 'Editar Item' : 'Novo Item'}
        </Text>

        <Divider style={styles.divider} />

        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.form}>
            <Input label="Título" value={titulo} onChangeText={setTitulo} />
            <Input label="Descrição" type="textarea" value={descricao} onChangeText={setDescricao} />
            <Input label="Valor (R$)" keyboardType="numeric" value={valor} onChangeText={setValor} />

            <View style={styles.typeRow}>
              <Button title="Confecção" variant={tipo === 'CONFECCAO' ? 'primary' : 'secondary'} onPress={() => setTipo('CONFECCAO')} />
              <Button title="Reparo" variant={tipo === 'REPARO' ? 'primary' : 'secondary'} onPress={() => setTipo('REPARO')} />
              <Button title="Ajuste" variant={tipo === 'AJUSTE' ? 'primary' : 'secondary'} onPress={() => setTipo('AJUSTE')} />
            </View>

            <View style={styles.dateGroup}>
              <Input label="Prazo" value={formatDate(dataPrazo)} editable={false} onPressIn={() => openDate('PRAZO')} />
              <Input label="Entrega" value={formatDate(dataEntrega)} editable={false} onPressIn={() => openDate('ENTREGA')} />
              <Input label="Prova" value={formatDate(dataProva)} editable={false} onPressIn={() => openDate('PROVA')} />
            </View>
          </View>
        </ScrollView>

        <View style={styles.actions}>
          <Button title={item ? 'Salvar Alterações' : 'Adicionar'} onPress={handleSave} />
          <Button title="Cancelar" variant="secondary" onPress={onDismiss} />
        </View>

        {activeDate && (
          <DateTimePicker
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
  divider: { backgroundColor: COLORS.border },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xl },
  form: { gap: SPACING.md },
  dateGroup: { gap: SPACING.sm },
  actions: { padding: SPACING.lg, gap: SPACING.sm },
  typeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
});