import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { IconButton, FAB } from 'react-native-paper';
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const ClienteCard = ({ pessoa }) => {
  // Cores dinâmicas baseadas no status que vem da sua API

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.pedidoTitle}>{pessoa.nome}</Text>
        <Text style={styles.pedidoSubtitle}>
          {pessoa.telefone}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Home({navigation}){
    
const [clientes, setClientes] = useState([]);
const [loading, setLoading] = useState(true);

const fetchClientes = async () => {
    try {
      setLoading(true);
      // Substitua pela URL da sua API (ex: http://192.168.1.10:3000/pedidos)
      const response = await fetch('https://ponto-gestor.onrender.com/api/clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() =>{
    fetchClientes();
}, [])
    return(
        <View style={styles.container}>
          <View style={styles.headerButtons}>
            <IconButton icon="cog-outline" size={26} />
            <IconButton icon="magnify" size={26} />
          </View>
          <View style={styles.titleArea}>
            <Text style={styles.headerTitle}>Clientes</Text>
            <Text style={styles.subTitle}>{clientes.length} resultados</Text>
          </View>
          <View style={styles.filterRow}>
           <TouchableOpacity style={styles.filterBox} onPress={fetchClientes}>
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
              data={clientes}
              keyExtractor={pessoa => pessoa.id.toString()}
              renderItem={({ item }) => <ClienteCard pessoa={item} />}
              contentContainerStyle={styles.listPadding}
              showsVerticalScrollIndicator={false}
              />
              )}

              <FAB
              style={styles.fab}
              icon="plus"
              color="white"
              onPress={() => console.log('Novo Cliente')}
              />         
        </View>
        
    )
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