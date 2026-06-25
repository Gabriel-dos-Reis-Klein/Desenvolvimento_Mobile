import { useEffect, useState, useMemo, useRef } from 'react';
import { Platform, StyleSheet, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Tabs from '../../components/common/Tabs'; 

import ServiceTypeSelector from '../../components/orders/ServiceTypeSelector'; 
import ItemStatusSelector from '../../components/orders/ItemStatusSelector';
import ItemAttachmentsTab from '../../components/orders/ItemAttachmentsTab';
import DateSelectorRow from '../../components/orders/DateSelectorRow';
import DateTimePickerModal from '../../components/orders/DateTimePickerModal';

import { COLORS, SPACING } from '../../theme';

import { orderItemSchema } from '../../validations/order.validation';
import { validateSchema } from '../../validations/validation.utils';

const formatCurrency = (value) => {
  if (typeof value === 'number') {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  const cleanValue = value.replace(/\D/g, '');
  if (!cleanValue) return '';
  const numberValue = Number(cleanValue) / 100;
  return numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const parseCurrencyToNumber = (formattedValue) => {
  if (!formattedValue) return undefined; 
  return Number(formattedValue.replace(/\D/g, '')) / 100;
};

export default function ItemForm({ navigation, route }) {
  const { item, mode = 'create', index, origin = 'CreateOrder' } = route.params || {};

  const [activeTab, setActiveTab] = useState('DADOS');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('CONFECCAO');
  const [statusItemPedido, setStatusItemPedido] = useState('PRODUCAO'); 
  const [imagens, setImagens] = useState([]); 

  const [fieldErrors, setFieldErrors] = useState({});
  const isSavingRef = useRef(false);

  const [dataPrazo, setDataPrazo] = useState(null);
  const [dataEntrega, setDataEntrega] = useState(null);
  const [dataProva, setDataProva] = useState(null);

  const [showProva, setShowProva] = useState(false);
  const [showEntrega, setShowEntrega] = useState(false);

  const [activeField, setActiveField] = useState(null); 
  const [pickerMode, setPickerMode] = useState('date'); 
  const [tempDate, setTempDate] = useState(new Date());

  const [initialFormState, setInitialFormState] = useState({
    titulo: '',
    descricao: '',
    valor: '',
    tipo: 'CONFECCAO',
    statusItemPedido: 'PRODUCAO',
    imagens: [],
    dataPrazo: null,
    dataEntrega: null,
    dataProva: null,
  });

  // Configuração dinâmica das abas para o componente Tabs
  const itemTabsConfig = useMemo(() => [
    { id: 'DADOS', label: 'Dados Gerais' },
    { id: 'ANEXOS', label: 'Anexos', count: imagens.length }
  ], [imagens.length]);

  useEffect(() => {
    if ((mode === 'edit' || mode === 'view') && item) {
      const initialTitulo = item.titulo || item.descricaoPeca || '';
      const initialDescricao = item.descricao || item.observacoes || '';
      const initialValor = item.valor ? formatCurrency(item.valor) : '';
      const initialTipo = item.tipo ? String(item.tipo).toUpperCase() : 'CONFECCAO';
      const initialStatus = item.statusItemPedido || item.statusPedido || item.status || 'PRODUCAO';
      const initialImagens = item.imagem || item.fotos || [];

      const initialDataPrazo = item.dataPrazo ? new Date(item.dataPrazo).toISOString() : null;
      const initialDataEntrega = item.dataEntrega ? new Date(item.dataEntrega).toISOString() : null;
      const initialDataProva = item.dataProva ? new Date(item.dataProva).toISOString() : null;

      setTitulo(initialTitulo);
      setDescricao(initialDescricao);
      setValor(initialValor);
      setTipo(initialTipo);
      setStatusItemPedido(initialStatus);
      setImagens(initialImagens);

      setDataPrazo(item.dataPrazo ? new Date(item.dataPrazo) : null);
      setDataEntrega(item.dataEntrega ? new Date(item.dataEntrega) : null);
      setDataProva(item.dataProva ? new Date(item.dataProva) : null);

      if (item.dataProva) setShowProva(true);
      if (item.dataEntrega) setShowEntrega(true);

      setInitialFormState({
        titulo: initialTitulo,
        descricao: initialDescricao,
        valor: initialValor,
        tipo: initialTipo,
        statusItemPedido: initialStatus,
        imagens: initialImagens,
        dataPrazo: initialDataPrazo,
        dataEntrega: item.dataEntrega ? initialDataEntrega : null,
        dataProva: item.dataProva ? initialDataProva : null,
      });
    }
  }, [item, mode]);

  const isFormModified = useMemo(() => {
    if (mode === 'create') {
      return (
        titulo !== '' ||
        descricao !== '' ||
        valor !== '' ||
        tipo !== 'CONFECCAO' ||
        statusItemPedido !== 'PRODUCAO' ||
        dataPrazo !== null ||
        dataEntrega !== null ||
        dataProva !== null ||
        imagens.length > 0
      );
    }

    const currentDataPrazo = dataPrazo ? dataPrazo.toISOString() : null;
    const currentDataEntrega = showEntrega && dataEntrega ? dataEntrega.toISOString() : null;
    const currentDataProva = showProva && dataProva ? dataProva.toISOString() : null;

    return (
      titulo !== initialFormState.titulo ||
      descricao !== initialFormState.descricao ||
      valor !== initialFormState.valor ||
      tipo !== initialFormState.tipo ||
      statusItemPedido !== initialFormState.statusItemPedido ||
      currentDataPrazo !== initialFormState.dataPrazo ||
      currentDataEntrega !== initialFormState.dataEntrega ||
      currentDataProva !== initialFormState.dataProva ||
      JSON.stringify(imagens) !== JSON.stringify(initialFormState.imagens)
    );
  }, [titulo, descricao, valor, tipo, statusItemPedido, dataPrazo, dataEntrega, dataProva, showEntrega, showProva, imagens, initialFormState, mode]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!isFormModified || isSavingRef.current) {
        return;
      }
      e.preventDefault();
      Alert.alert(
        'Alterações não salvas',
        'Você possui alterações que não foram salvas. Deseja realmente sair e descartar essas alterações?',
        [
          { text: 'Continuar editando', style: 'cancel', onPress: () => {} },
          {
            text: 'Descartar e sair',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });
    return unsubscribe;
  }, [navigation, isFormModified]);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("É necessário dar permissão de acesso à galeria para adicionar anexos.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7,
      base64: true, 
    });

    if (!result.canceled && result.assets[0].base64) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImagens((prev) => [...prev, base64Image]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImagens((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleOpenPicker = (field, mode) => {
    setPickerMode(mode);
    setActiveField(field);

    const currentVal =
      field === 'PRAZO' && dataPrazo
        ? dataPrazo
        : field === 'ENTREGA' && dataEntrega
        ? dataEntrega
        : field === 'PROVA' && dataProva
        ? dataProva
        : new Date();

    setTempDate(currentVal);
  };

  const saveDate = (selectedDate) => {
    let baseDate =
      activeField === 'PRAZO'
        ? dataPrazo
        : activeField === 'ENTREGA'
        ? dataEntrega
        : dataProva;

    const currentTargetDate = baseDate ? new Date(baseDate) : new Date();

    if (pickerMode === 'date') {
      currentTargetDate.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
    } else {
      currentTargetDate.setHours(
        selectedDate.getHours(),
        selectedDate.getMinutes(),
        0,
        0
      );
    }

    if (activeField === 'ENTREGA') {
      setDataEntrega(currentTargetDate);
      setFieldErrors((prev) => ({ ...prev, dataEntrega: undefined }));
    }

    if (activeField === 'PROVA') {
      setDataProva(currentTargetDate);
      setFieldErrors((prev) => ({ ...prev, dataProva: undefined }));
    }

    if (activeField === 'PRAZO') {
      setDataPrazo(currentTargetDate);
      setFieldErrors((prev) => ({ ...prev, dataPrazo: undefined }));
    }
  };

  const handleConfirmIOS = () => {
    saveDate(tempDate);
    setActiveField(null);
  };

  const handlePickerChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      if (event.type === 'set' && selectedDate) {
        saveDate(selectedDate);
      }
      setActiveField(null);
    } else {
      if (selectedDate) setTempDate(selectedDate);
    }
  };

  const handleValorChange = (text) => {
    if (fieldErrors.valor) setFieldErrors(prev => ({ ...prev, valor: undefined }));
    setValor(formatCurrency(text));
  };

  const handleSave = () => {
    const payload = {
      id: item?.id || undefined,
      titulo,
      descricao,
      valor: parseCurrencyToNumber(valor),
      imagem: imagens,
      tipo,
      statusItemPedido: statusItemPedido,
      dataPrazo: dataPrazo ? dataPrazo.toISOString() : null,
      dataEntrega: showEntrega && dataEntrega ? dataEntrega.toISOString() : null,
      dataProva: showProva && dataProva ? dataProva.toISOString() : null,
    };

    const validation = validateSchema(orderItemSchema, payload);

    if (!validation.success) {
      setActiveTab('DADOS');
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});
    isSavingRef.current = true;

    const finalData = {
      ...validation.data,
      statusItemPedido: statusItemPedido,
      status: statusItemPedido 
    };

    navigation.navigate({
      name: origin,
      params: { 
        savedItem: finalData, 
        savedIndex: index 
      },
      merge: true,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <PageHeader title={mode === 'create' ? 'Novo Item' : 'Editar Item'} onBack={() => navigation.goBack()} />
      </View>

      <Tabs 
        tabs={itemTabsConfig} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <KeyboardAwareScrollView 
        style={styles.body}
        contentContainerStyle={activeTab === 'DADOS' ? styles.content : { flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={40}
      >
        {activeTab === 'DADOS' ? (
          <View style={styles.innerFormContainer}>
            <Input 
              label="Título" 
              value={titulo} 
              onChangeText={(text) => {
                if (fieldErrors.titulo) setFieldErrors(prev => ({ ...prev, titulo: undefined }));
                setTitulo(text);
              }} 
              error={fieldErrors.titulo}
            />
            <Input 
              label="Descrição" 
              type="textarea" 
              value={descricao} 
              onChangeText={(text) => {
                if (fieldErrors.descricao) setFieldErrors(prev => ({ ...prev, dataDescricao: undefined }));
                setDescricao(text);
              }} 
              error={fieldErrors.descricao}
            />
            <View style={styles.inputGroup}>
              <ServiceTypeSelector value={tipo} onChange={setTipo} />
            </View>
            
            {mode !== 'create' && (
              <View style={styles.inputGroup}>
                <ItemStatusSelector value={statusItemPedido} onChange={setStatusItemPedido} />
              </View>
            )}

            <Input 
              label="Valor" 
              keyboardType="numeric" 
              value={valor} 
              onChangeText={handleValorChange} 
              placeholder="R$ 0,00" 
              error={fieldErrors.valor}
            />

            <DateSelectorRow
              label="Prazo Final"
              dateValue={dataPrazo}
              onOpenDate={() => handleOpenPicker('PRAZO', 'date')}
              onOpenTime={() => handleOpenPicker('PRAZO', 'time')}
              error={fieldErrors.dataPrazo}
            />

            <DateSelectorRow
              label="Data da Prova"
              dateValue={dataProva}
              onOpenDate={() => handleOpenPicker('PROVA', 'date')}
              onOpenTime={() => handleOpenPicker('PROVA', 'time')}
              hasToggle={true}
              isToggled={showProva}
              onToggle={() => {
                if (showProva) {
                  setDataProva(null);
                  setFieldErrors(prev => ({ ...prev, dataProva: undefined }));
                }
                setShowProva(!showProva);
              }}
              toggleTextOn="✕ Remover Data da Prova"
              toggleTextOff="+ Adicionar Data da Prova"
              error={fieldErrors.dataProva}
            />

            <DateSelectorRow
              label="Data de Entrega"
              dateValue={dataEntrega}
              onOpenDate={() => handleOpenPicker('ENTREGA', 'date')}
              onOpenTime={() => handleOpenPicker('ENTREGA', 'time')}
              hasToggle={true}
              isToggled={showEntrega}
              onToggle={() => {
                if (showEntrega) {
                  setDataEntrega(null);
                  setFieldErrors(prev => ({ ...prev, dataEntrega: undefined }));
                }
                setShowEntrega(!showEntrega);
              }}
              toggleTextOn="✕ Remover Data de Entrega"
              toggleTextOff="+ Adicionar Data de Entrega"
              error={fieldErrors.dataEntrega}
            />
          </View>
        ) : (
          <ItemAttachmentsTab imagens={imagens} onPickImage={handlePickImage} onRemoveImage={handleRemoveImage} />
        )}
      </KeyboardAwareScrollView>

      <View style={styles.footer}>
        <Button title="Salvar" disabled={!isFormModified} onPress={handleSave} />
        <Button title="Cancelar" variant="secondary" onPress={() => navigation.goBack()} />
      </View>

      <DateTimePickerModal
        visible={!!activeField}
        date={tempDate}
        mode={pickerMode}
        onChange={handlePickerChange}
        onConfirmIOS={handleConfirmIOS}
        onCancelIOS={() => setActiveField(null)}
      />
    </SafeAreaView>
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
        width: '100%' 
      },
    }),
  },
  header: { 
    paddingHorizontal: SPACING.md, 
    paddingTop: 0 
  },
  body: { 
    flex: 1 
  },
  content: { 
    paddingHorizontal: SPACING.xl, 
    paddingVertical: SPACING.xl 
  },
  innerFormContainer: { 
    gap: SPACING.lg 
  },
  inputGroup: { 
    gap: SPACING.xs 
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? 0 : SPACING.md,
    gap: SPACING.md,
    backgroundColor: COLORS.background,
  },
});