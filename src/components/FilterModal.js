import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Modal, Portal, Checkbox } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FilterModal = ({ visible, onDismiss }) => {
  const [tabAtiva, setTabAtiva] = useState('Tipo'); // 'Tipo' ou 'Estado'
  const [selecionados, setSelecionados] = useState({ todos: true });

  // Opções baseadas na sua imagem
  const opcoesTipo = [
    { id: 'todos', label: 'Todos', icon: 'tshirt-crew' },
    { id: 'confeccao', label: 'Confecção', icon: 'plus' },
    { id: 'modificacao', label: 'Modificação', icon: 'pencil' },
    { id: 'reparo', label: 'Reparo', icon: 'cached' },
  ];

  const opcoesEstado = [
    { id: 'todos_e', label: 'Todos', color: '#FF0050' },
    { id: 'producao', label: 'Produção', color: '#FF00FF' },
    { id: 'pronto', label: 'Pronto', color: '#FFB800' },
    { id: 'entregue', label: 'Entregue', color: '#00D1FF' },
  ];

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <View style={styles.indicator} />
        <Text style={styles.title}>Filtrar por</Text>

        {/* Abas (Tipo | Estado) */}
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setTabAtiva('Tipo')} style={styles.tabButton}>
            <Text style={[styles.tabText, tabAtiva === 'Tipo' && styles.tabTextAtivo]}>Tipo</Text>
            {tabAtiva === 'Tipo' && <View style={styles.dot} />}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTabAtiva('Estado')} style={styles.tabButton}>
            <Text style={[styles.tabText, tabAtiva === 'Estado' && styles.tabTextAtivo]}>Estado</Text>
            {tabAtiva === 'Estado' && <View style={styles.dot} />}
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.optionsList}>
          {tabAtiva === 'Tipo' ? (
            opcoesTipo.map(item => (
              <View key={item.id} style={styles.optionRow}>
                <View style={styles.iconBox}>
                  <MaterialCommunityIcons name={item.icon} size={24} color="#333" />
                </View>
                <Text style={styles.optionLabel}>{item.label}</Text>
                <Checkbox.Android 
                    status={selecionados[item.id] ? 'checked' : 'unchecked'} 
                    color="#FF0050" 
                    onPress={() => setSelecionados({...selecionados, [item.id]: !selecionados[item.id]})}
                />
              </View>
            ))
          ) : (
            opcoesEstado.map(item => (
              <View key={item.id} style={styles.optionRow}>
                <View style={[styles.colorCircle, { backgroundColor: item.color }]} />
                <Text style={styles.optionLabel}>{item.label}</Text>
                <Checkbox.Android 
                    status={selecionados[item.id] ? 'checked' : 'unchecked'} 
                    color="#FF0050" 
                    onPress={() => setSelecionados({...selecionados, [item.id]: !selecionados[item.id]})}
                />
              </View>
            ))
          )}
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 40,
    height: '60%', // Ajuste conforme necessário
  },
  indicator: { width: 40, height: 5, backgroundColor: '#EEE', borderRadius: 10, alignSelf: 'center', marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  tabContainer: { flexDirection: 'row', justifyContent: 'center', gap: 30, marginBottom: 20 },
  tabButton: { alignItems: 'center' },
  tabText: { fontSize: 18, color: '#AAA', fontWeight: '500' },
  tabTextAtivo: { color: '#333' },
  dot: { width: 4, height: 4, backgroundColor: '#FF0050', borderRadius: 2, marginTop: 4 },
  optionsList: { marginTop: 10 },
  optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  iconBox: { width: 50, height: 50, backgroundColor: '#F5F5F5', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  colorCircle: { width: 45, height: 45, borderRadius: 22.5 },
  optionLabel: { flex: 1, marginLeft: 20, fontSize: 18, color: '#333' },
});

export default FilterModal;