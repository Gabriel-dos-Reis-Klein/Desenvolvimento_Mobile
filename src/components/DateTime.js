import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import React, { useState, useEffect } from "react";
const CustomDateTimePicker = ({ visible, currentDate, onConfirm, onCancel }) => {
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const confirmar = () => {
    const newDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
    onConfirm(newDate);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.customPickerContainer}>
          <Text style={styles.customPickerTitle}>Selecione a data</Text>

          {/* Ano, Mês, Dia */}
          <View style={styles.pickerRow}>
            <Text style={styles.pickerColumnLabel}>Ano</Text>
            <Text style={styles.pickerColumnLabel}>Mês</Text>
            <Text style={styles.pickerColumnLabel}>Dia</Text>
          </View>
          <View style={styles.pickerRow}>
            <ScrollView style={styles.pickerColumn}>
              {years.map((y) => (
                <TouchableOpacity
                  key={y}
                  onPress={() => setSelectedYear(y)}
                  style={[styles.pickerItem, y === selectedYear && styles.pickerItemSelected]}
                >
                  <Text style={[styles.pickerItemText, y === selectedYear && styles.pickerItemTextSelected]}>{y}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <ScrollView style={styles.pickerColumn}>
              {months.map((m) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => setSelectedMonth(m)}
                  style={[styles.pickerItem, m === selectedMonth && styles.pickerItemSelected]}
                >
                  <Text style={[styles.pickerItemText, m === selectedMonth && styles.pickerItemTextSelected]}>{m.toString().padStart(2, '0')}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <ScrollView style={styles.pickerColumn}>
              {days.map((d) => (
                <TouchableOpacity
                  key={d}
                  onPress={() => setSelectedDay(d)}
                  style={[styles.pickerItem, d === selectedDay && styles.pickerItemSelected]}
                >
                  <Text style={[styles.pickerItemText, d === selectedDay && styles.pickerItemTextSelected]}>{d.toString().padStart(2, '0')}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Botões */}
          <View style={styles.customPickerButtons}>
            <Button mode="outlined" onPress={onCancel} style={{ flex: 1, marginRight: 10 }}>
              Cancelar
            </Button>
            <Button mode="contained" onPress={confirmar} style={{ flex: 1, backgroundColor: "#FF0050" }}>
              Confirmar
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
/*
const styles = StyleSheet.create({
customPickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    maxHeight: "80%",
  },
  customPickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  pickerColumnLabel: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "#555",
  },
  pickerColumn: {
    flex: 1,
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 2,
  },
  pickerItem: {
    paddingVertical: 10,
    alignItems: "center",
  },
  pickerItemSelected: {
    backgroundColor: "#FF0050",
  },
  pickerItemText: {
    color: "#000",
    fontSize: 16,
  },
  pickerItemTextSelected: {
    color: "#fff",
  },
  customPickerButtons: {
    flexDirection: "row",
    marginTop: 20,
  }
});*/

export default CustomDateTimePicker;