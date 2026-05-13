import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados dos inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistro = async () => {
  try {
    const response = await fetch('https://ponto-gestor.onrender.com/api/post/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        phone: phone,
        senha: password
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Se deu certo, navega para a Home
      navigation.replace('Home');
    } else {
      alert("Erro ao cadastrar!");
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          
          {/* Cabeçalho com Ícone */}
          <View style={styles.headerContainer}>
            <View style={styles.line} />
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name="content-cut" size={28} color="white" />
            </View>
            <View style={styles.line} />
          </View>

          <Text style={styles.title}>Junte-se a nós</Text>

          {/* Switch de Navegação */}
          <View style={styles.switchContainer}>
            <TouchableOpacity 
              style={styles.switchButtonOff} 
              onPress={() => navigation.navigate('Login')} // Troca para a tela de Login
            >
              <Text style={styles.textOff}>Entrar</Text>
            </TouchableOpacity>
            
            <View style={styles.switchButtonOn}>
              <Text style={styles.textOn}>Registrar-se</Text>
            </View>
          </View>

          {/* Inputs Baseados na Imagem */}
          <TextInput
            label="Nome de usuário"
            mode="outlined"
            style={styles.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#FF0050"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            label="E-mail"
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#FF0050"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            label="Telefone"
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#FF0050"
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            label="Senha"
            mode="outlined"
            secureTextEntry={!showPassword}
            style={styles.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#FF0050"
            right={<TextInput.Icon name={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            label="Confirmar senha"
            mode="outlined"
            secureTextEntry={!showConfirmPassword}
            style={styles.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#FF0050"
            right={<TextInput.Icon name={showConfirmPassword ? "eye-off" : "eye"} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Botão Prosseguir */}
          <Button 
            mode="contained" 
            style={styles.mainButton}
            labelStyle={styles.buttonLabel}
            onPress={() => handleRegistro}
          >
            Prosseguir
          </Button>

          {/* Indicador de etapa (os tracinhos rosa no rodapé) */}
          <View style={styles.stepIndicator}>
            <View style={[styles.stepLine, { backgroundColor: '#FF0050', width: 30 }]} />
            <View style={styles.stepLine} />
            <View style={styles.stepLine} />
          </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
    marginHorizontal: 10,
    borderStyle: 'dashed', // Para simular os traços da imagem
  },
  iconBox: {
    backgroundColor: '#FF0050',
    padding: 10,
    borderRadius: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 5,
    marginBottom: 25,
  },
  switchButtonOn: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    // Sombra para o efeito de elevação do switch ativo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  switchButtonOff: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textOn: { color: '#333', fontWeight: 'bold' },
  textOff: { color: '#999', fontWeight: '600' },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
    height: 50,
  },
  mainButton: {
    backgroundColor: '#FF0050',
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 5,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'none',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  stepLine: {
    height: 3,
    width: 15,
    backgroundColor: '#FFD1DC',
    marginHorizontal: 4,
    borderRadius: 2,
  },
});