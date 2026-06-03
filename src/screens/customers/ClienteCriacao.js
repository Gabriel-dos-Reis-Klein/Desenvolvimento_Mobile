import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, ScrollView } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IconeVoltar = require('../../assets/return.png');

export default function ClienteCriacao({navigation}){
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false);  

const createClientes = async () => {
    if (!nome || !telefone) {
      Alert.alert("Erro", "Nome e Telefone são obrigatórios");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('https://ponto-gestor.onrender.com/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          telefone: telefone,
          email: email
        }),
      });

      if (response.ok) {
        console.log("Sucesso", "Cliente cadastrado com sucesso!");
        // Volta para a tela anterior (Lista de Clientes)
        navigation.goBack(); 
      } else {
        const errorData = await response.json();
        console.log("Erro", errorData.message || "Erro ao criar cliente");
      }
    } catch (error) {
      console.error(error);
      console.log("Erro", "Não foi possível conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  return(
  <ScrollView contentContainerStyle={styles.scrollContent}>  
    <View style={styles.container}>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={IconeVoltar} style={styles.customIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      <Text style={styles.title}>Criar Contato</Text>
          <TextInput
          label="Nome"
          value={nome}
          onChangeText={setNome}
          mode="outlined"
          style={styles.input}
          theme={{
          colors: {
          text: '#000000',      // Para versões antigas do Paper
          onSurface: '#000000', // Para versão 5+ (MD3)
          primary: '#FF0050',
          placeholder: '#666',
          }
          }}
          outlineColor="#E0E0E0"
          activeOutlineColor="#FF0050"
        />

        <TextInput
          label="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          mode="outlined"
          style={styles.input}
          theme={{
          colors: {
          text: '#000000',      // Para versões antigas do Paper
          onSurface: '#000000', // Para versão 5+ (MD3)
          primary: '#FF0050',
          placeholder: '#666',
          }
          }}
          keyboardType="phone-pad"
          outlineColor="#E0E0E0"
          activeOutlineColor="#FF0050"
        />

        <TextInput
          label="email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          theme={{
          colors: {
          text: '#000000',      // Para versões antigas do Paper
          onSurface: '#000000', // Para versão 5+ (MD3)
          primary: '#FF0050',
          placeholder: '#666',
          }
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          outlineColor="#E0E0E0"
          activeOutlineColor="#FF0050"
        />
        <Button 
          mode="contained" 
          loading={loading} 
          disabled={loading}
          onPress={createClientes}
          style={styles.mainButton}
          contentStyle={{ height: 50 }}
        >
          Adicionar
        </Button>
    </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    padding: 10 
  },
  customIcon: { 
    width: 26, 
    height: 26 
  },
  input: { 
    marginBottom: 12, 
    backgroundColor: 'white',
  },
  headerButtons: { 
    marginBottom: 20,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10
  }, 
  mainButton: { 
    backgroundColor: '#FF0050', 
    borderRadius: 8, 
    marginTop: 10
  },
  scrollContent: { 
    flexGrow: 1, 
    backgroundColor: '#FFFFFF', 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#333' 
  },
});