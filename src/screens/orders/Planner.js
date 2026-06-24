import { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from '@marceloterreiro/flash-calendar';

import { COLORS, SPACING, FONT_FAMILY } from '../../theme'; 
import PageHeader from '../../components/common/PageHeader';
import { orderService } from '../../services'; 
import { showError } from '../../errors/showError';

// Converte objetos Firestore, strings ISO ou Date nativo com segurança
const parseToNativeDate = (dateSource) => {
  if (!dateSource) return null;
  
  if (typeof dateSource === 'object' && 'seconds' in dateSource) {
    return new Date(dateSource.seconds * 1000);
  }

  if (dateSource instanceof Date) {
    return dateSource;
  }

  const parsed = new Date(dateSource);
  return !isNaN(parsed.getTime()) ? parsed : null;
};

const isValidDate = (date) => {
  return parseToNativeDate(date) !== null;
};

const toLocalDateString = (date) => {
  const d = parseToNativeDate(date);
  if (!d) {
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatTime = (dateString) => {
  const date = parseToNativeDate(dateString);
  if (!date) return '--:--';
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

export default function Planner({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => toLocalDateString(new Date()));
  const [compromissos, setCompromissos] = useState([]);

  const fetchAgendaData = async () => {
    try {
      setLoading(true);
      const orders = await orderService.getAll(); 
      const listaEventos = [];

      orders?.forEach((pedido) => {
        pedido.itens?.forEach((item) => {
          if (item.dataPrazo && isValidDate(item.dataPrazo)) {
            listaEventos.push({
              id: `${item.id}-prazo`,
              tipo: 'PRAZO',
              dataStr: toLocalDateString(item.dataPrazo),
              horaStr: formatTime(item.dataPrazo),
              titulo: item.titulo || 'Item sem título',
              pedidoId: pedido.id,
              cor: '#ff3b30' 
            });
          }
          if (item.dataProva && isValidDate(item.dataProva)) {
            listaEventos.push({
              id: `${item.id}-prova`,
              tipo: 'PROVA',
              dataStr: toLocalDateString(item.dataProva),
              horaStr: formatTime(item.dataProva),
              titulo: item.titulo || 'Item sem título',
              pedidoId: pedido.id,
              cor: '#34c759' 
            });
          }
          if (item.dataEntrega && isValidDate(item.dataEntrega)) {
            listaEventos.push({
              id: `${item.id}-entrega`,
              tipo: 'ENTREGA',
              dataStr: toLocalDateString(item.dataEntrega),
              horaStr: formatTime(item.dataEntrega),
              titulo: item.titulo || 'Item sem título',
              pedidoId: pedido.id,
              cor: '#007aff' 
            });
          }
        });
      });

      setCompromissos(listaEventos);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgendaData();
  }, []);

  const eventosDoDiaSelecionado = useMemo(() => {
    if (!selectedDate) return [];
    return compromissos.filter((ev) => ev.dataStr === selectedDate);
  }, [selectedDate, compromissos]);

  const currentMonthId = useMemo(() => {
    if (selectedDate && selectedDate.length >= 7) {
      return selectedDate.substring(0, 7);
    }
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;
  }, [selectedDate]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.headerContainer}>
        <PageHeader title="Planner" onBack={() => navigation.goBack()} />
      </View>

      <View style={styles.calendarCard}>
        <Calendar
          calendarActiveDateRanges={
            selectedDate
              ? [{ startId: selectedDate, endId: selectedDate, properties: { isSelected: true } }]
              : []
          }
          calendarDayCallbacks={{
            onDayPress: (dayId) => {
              if (dayId) setSelectedDate(dayId);
            },
          }}
          calendarMonthId={currentMonthId}
        />
      </View>

      <Text style={styles.sectionTitle}>Compromissos do Dia</Text>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.eventsList}
        showsVerticalScrollIndicator={false}
      >
        {eventosDoDiaSelecionado.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum compromisso para esta data.</Text>
          </View>
        ) : (
          eventosDoDiaSelecionado.map((evento) => (
            <TouchableOpacity
              key={evento.id}
              style={[styles.eventCard, { borderLeftColor: evento.cor }]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('OrderDetails', { orderId: evento.pedidoId })}
            >
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle} numberOfLines={1}>{evento.titulo}</Text>
                <Text style={styles.eventBadgeType}>{evento.tipo}</Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.eventTime}>{evento.horaStr || '--:--'}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerContainer: { paddingHorizontal: SPACING.md },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  calendarCard: {
    backgroundColor: '#ffffff',
    margin: SPACING.xl,
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e4e8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#24292e',
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.sm,
    fontFamily: FONT_FAMILY?.poppinsSemiBold || 'System'
  },
  scroll: { flex: 1 },
  eventsList: { paddingHorizontal: SPACING.xl, paddingBottom: SPACING.xl, gap: SPACING.md },
  eventCard: {
    backgroundColor: '#ffffff',
    padding: SPACING.lg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e4e8',
    borderLeftWidth: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventInfo: { flex: 1, gap: 2 },
  eventTitle: { fontSize: 15, fontWeight: '600', color: '#24292e' },
  eventBadgeType: { fontSize: 12, color: '#586069', fontWeight: '500' },
  timeContainer: { backgroundColor: '#f6f8fa', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  eventTime: { fontSize: 13, fontWeight: '700', color: '#24292e' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: SPACING.xl },
  emptyText: { color: '#586069', fontSize: 14, textAlign: 'center' },
});