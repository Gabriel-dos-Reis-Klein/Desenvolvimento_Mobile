import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { IconButton, FAB } from 'react-native-paper';
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from '../components/Icon'

const PedidoCard = ({ item }) => {
  // Cores dinâmicas baseadas no status que vem da sua API
  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s?.includes('em andamento')) return '#FF00FF';
    if (s?.includes('aguardando')) return '#FFB800';
    if (s?.includes('entregue')) return '#00D1FF';
    return '#E0E0E0';
  };

  const getIcon = (tipo) => {
    const t = tipo?.toLowerCase();
    if (t?.includes('confecção')) return Icon.confeccao;
    if (t?.includes('modificação')) return Icon.modificacao;
    if (t?.includes('reparo')) return Icon.reparo;
    return 'dots-horizontal';
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name={getIcon(item.tipo)} size={24} color="#333" />
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]} />
      </View>

      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.pedidoTitle}>{item.descricaoPeca}</Text>
        <Text style={styles.pedidoSubtitle}>
          {item.tipo} • {item.status} • {item.data}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Home({navigation}){
    
const [pedidos, setPedidos] = useState([]);
const [loading, setLoading] = useState(true);

const fetchPedidos = async () => {
    try {
      setLoading(true);
      // Substitua pela URL da sua API (ex: http://192.168.1.10:3000/pedidos)
      const response = await fetch('https://ponto-gestor.onrender.com/api/pedidos');
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };



useEffect(() =>{
    fetchPedidos();
}, [])
    return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <IconButton icon="cog-outline" size={26} />
        <IconButton icon="magnify" size={26} />
      </View>

      <View style={styles.titleArea}>
        <Text style={styles.headerTitle}>Pedidos</Text>
        <Text style={styles.subTitle}>{pedidos.length} resultados</Text>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterBox} onPress={fetchPedidos}>
          <MaterialCommunityIcons name="sort-variant" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBox}>
          <MaterialCommunityIcons name="filter-variant" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF0050" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <PedidoCard item={item} />}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => console.log('Novo Pedido')}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerButtons: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },
  titleArea: { alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 34, fontWeight: 'bold' },
  subTitle: { fontSize: 14, color: '#888' },
  filterRow: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginBottom: 25 },
  filterBox: { 
    width: 55, 
    height: 55, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E0E0E0', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  listPadding: { paddingHorizontal: 20, paddingBottom: 100 },
  card: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  iconContainer: { position: 'relative' },
  iconCircle: { 
    width: 55, 
    height: 55, 
    backgroundColor: '#F5F5F5', 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  statusBadge: { 
    position: 'absolute', 
    bottom: -2, 
    right: -2, 
    width: 16, 
    height: 16, 
    borderRadius: 8, 
    borderWidth: 2, 
    borderColor: '#FFF' 
  },
  contentContainer: { flex: 1, marginLeft: 15 },
  pedidoTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  pedidoSubtitle: { fontSize: 13, color: '#999', marginTop: 3 },
  fab: { 
    position: 'absolute', 
    right: 20, 
    bottom: 20, 
    backgroundColor: '#FF3366', 
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
});