import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal, Portal, RadioButton } from 'react-native-paper';

const SortModal = ({ visible, onDismiss, onSelect, value }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        {/* Indicador de puxar (o tracinho em cima) */}
        <View style={styles.dragIndicator} />

        <Text style={styles.modalTitle}>Ordenar por</Text>

        <RadioButton.Group onValueChange={newValue => onSelect(newValue)} value={value}>
          
          <TouchableOpacity style={styles.radioOption} onPress={() => onSelect('alfabetica')}>
            <Text style={styles.radioLabel}>Ordem alfabética</Text>
            <RadioButton.Android value="alfabetica" color="#FF0050" uncheckedColor="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.radioOption} onPress={() => onSelect('prazo')}>
            <Text style={styles.radioLabel}>Prazo de entrega</Text>
            <RadioButton.Android value="prazo" color="#FF0050" uncheckedColor="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.radioOption} onPress={() => onSelect('cliente')}>
            <Text style={styles.radioLabel}>Cliente do pedido</Text>
            <RadioButton.Android value="cliente" color="#FF0050" uncheckedColor="#888" />
          </TouchableOpacity>

        </RadioButton.Group>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 50, // Espaço extra para não ficar colado embaixo
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
    marginTop: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  radioLabel: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
});

export default SortModal