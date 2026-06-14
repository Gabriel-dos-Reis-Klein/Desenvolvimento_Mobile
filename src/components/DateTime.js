import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Button } from 'react-native-paper';

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default function CustomDateTimePicker({
  visible,
  currentDate,
  onConfirm,
  onCancel,
}) {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  useEffect(() => {
    if (visible) {
      setSelectedDate(currentDate ?? new Date());
    }
  }, [visible, currentDate]);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);

  const monthDays = [];
  for (let i = 0; i < firstDayIndex; i += 1) {
    monthDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    monthDays.push(new Date(year, month, day));
  }

  const handleMonthChange = (offset) => {
    const newDate = new Date(year, month + offset, 1);
    setSelectedDate(newDate);
  };

  const handleConfirm = () => {
    onConfirm(selectedDate);
  };

  const isSelectedDay = (day) => {
    return (
      day &&
      day.getDate() === selectedDate.getDate() &&
      day.getMonth() === selectedDate.getMonth() &&
      day.getFullYear() === selectedDate.getFullYear()
    );
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Selecionar Data</Text>

          <View style={styles.calendarHeader}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => handleMonthChange(-1)}
            >
              <Text style={styles.navText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.monthTitle}>
              {MONTH_NAMES[month]} {year}
            </Text>

            <TouchableOpacity
              style={styles.navButton}
              onPress={() => handleMonthChange(1)}
            >
              <Text style={styles.navText}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysRow}>
            {WEEK_DAYS.map((day, index) => (
              <Text key={`weekday-${index}`} style={styles.weekDayText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {monthDays.map((day, index) => (
              <TouchableOpacity
                key={`${index}-${day?.getDate() ?? 'empty'}`}
                style={[
                  styles.dayCell,
                  isSelectedDay(day) && styles.dayCellSelected,
                  !day && styles.dayCellEmpty,
                ]}
                disabled={!day}
                onPress={() => day && setSelectedDate(day)}
              >
                <Text
                  style={[
                    styles.dayText,
                    isSelectedDay(day) && styles.dayTextSelected,
                    !day && styles.dayTextEmpty,
                  ]}
                >
                  {day ? day.getDate() : ''}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actions}>
            <Button
              mode="outlined"
              onPress={onCancel}
              style={{ flex: 1, marginRight: 10 }}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={handleConfirm}
              style={{ flex: 1, backgroundColor: '#FF0050' }}
            >
              Confirmar
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 360,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 18,
    color: '#333',
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  weekDayText: {
    width: 40,
    textAlign: 'center',
    color: '#555',
    fontWeight: 'bold',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCell: {
    width: '13%',
    aspectRatio: 1,
    marginBottom: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  dayCellEmpty: {
    backgroundColor: 'transparent',
  },
  dayCellSelected: {
    backgroundColor: '#FF0050',
  },
  dayText: {
    color: '#333',
  },
  dayTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dayTextEmpty: {
    color: 'transparent',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },
});
