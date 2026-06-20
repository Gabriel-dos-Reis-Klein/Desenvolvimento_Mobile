import { useEffect, useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { SegmentedButtons, Text } from 'react-native-paper'; // Adicionado para o seletor profissional

import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

import { COLORS, SPACING, FONT_FAMILY } from '../../theme';

export default function ItemForm({ navigation, route }) {
  const { item, mode = 'create', onSave, index } = route.params || {};

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('CONFECCAO'); // Novo estado alinhado com seu JSON

  const [dataPrazo, setDataPrazo] = useState(null);
  const [dataEntrega, setDataEntrega] = useState(null);
  const [dataProva, setDataProva] = useState(null);

  const [activeDate, setActiveDate] = useState(null);

  useEffect(() => {
    if (mode === 'edit' && item) {
      setTitulo(item.titulo || '');
      setDescricao(item.descricao || '');
      setValor(item.valor ? String(item.valor) : '');
      setTipo(item.tipo ? String(item.tipo).toUpperCase() : 'CONFECCAO'); // Carrega o tipo correto na edição

      setDataPrazo(item.dataPrazo ? new Date(item.dataPrazo) : null);
      setDataEntrega(item.dataEntrega ? new Date(item.dataEntrega) : null);
      setDataProva(item.dataProva ? new Date(item.dataProva) : null);
    }
  }, [item]);

  const formatDate = (date) =>
    date ? date.toLocaleDateString('pt-BR') : '';

  const handleSave = () => {
    const newItem = {
      titulo,
      descricao,
      valor: Number(valor || 0),
      imagem: item?.imagem || [], // Preserva as imagens existentes se houver
      tipo,                       // Enviando o tipo selecionado pelo usuário
      dataPrazo: dataPrazo ? dataPrazo.toISOString() : null,
      dataEntrega: dataEntrega ? dataEntrega.toISOString() : null,
      dataProva: dataProva ? dataProva.toISOString() : null,
    };

    onSave?.(newItem, index);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <PageHeader
          title={mode === 'edit' ? 'Editar Item' : 'Novo Item'}
          onBack={() => navigation.goBack()}
        />
      </View>

      <View style={styles.body}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >

            {/* SELETOR DE TIPO PROFISSIONAL */}
            <View style={styles.segmentedContainer}>
              <Text style={styles.label}>Tipo do Serviço</Text>
              <SegmentedButtons
                value={tipo}
                onValueChange={setTipo}
                density="regular"
                theme={{ colors: { primary: COLORS.primary } }} // Aplica o rosa da sua marca
                buttons={[
                  { value: 'CONFECCAO', label: 'Confecção' },
                  { value: 'REPARO', label: 'Reparo' },
                  { value: 'MODIFICACAO', label: 'Modif.' },
                ]}
              />
            </View>

            <Input label="Título" value={titulo} onChangeText={setTitulo} />

            <Input
              label="Descrição"
              type="textarea"
              value={descricao}
              onChangeText={setDescricao}
            />

            <Input
              label="Valor"
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
            />

            <Input
              label="Prazo"
              value={formatDate(dataPrazo)}
              editable={false}
              onPressIn={() => setActiveDate('PRAZO')}
            />

            <Input
              label="Entrega"
              value={formatDate(dataEntrega)}
              editable={false}
              onPressIn={() => setActiveDate('ENTREGA')}
            />

            <Input
              label="Prova"
              value={formatDate(dataProva)}
              editable={false}
              onPressIn={() => setActiveDate('PROVA')}
            />

          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <View style={styles.footer}>
        <Button title="Salvar" onPress={handleSave} />
        <Button title="Cancelar" variant="secondary" onPress={() => navigation.goBack()} />
      </View>

      {activeDate && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            if (!date) return setActiveDate(null);

            if (activeDate === 'PRAZO') setDataPrazo(date);
            if (activeDate === 'ENTREGA') setDataEntrega(date);
            if (activeDate === 'PROVA') setDataProva(date);

            setActiveDate(null);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    ...Platform.select({
      web: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
      },
    }),
  },

  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
  },

  body: {
    flex: 1,
    overflow: 'hidden',
  },

  keyboard: {
    flex: 1,
  },

  scroll: {
    flex: 1,
    ...Platform.select({
      web: {
        overflowY: 'auto',
      },
    }),
  },

  content: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },

  footer: {
    padding: SPACING.xl,
    gap: SPACING.md,
    backgroundColor: COLORS.background,
  },

  segmentedContainer: {
    marginBottom: SPACING.xs,
  },

  label: {
    fontSize: 14,
    fontFamily: FONT_FAMILY?.poppinsMedium || 'System',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
});
