import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [secureText, setSecureText] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.card}>
        {/* Ícone de Tesoura */}

        <View style={styles.headerContainer}>
          <View style={styles.line} />        
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="content-cut" size={30} color="white" />
          </View>
          <View style={styles.line} />
        </View>

        <Text style={styles.title}>Comece agora</Text>

        {/* Switch / Tab Selector Customizado */}
        <View style={styles.switchContainer}>
          <View style={styles.switchButtonOn}>
              <Text style={styles.textOn}>Entrar</Text>
            </View>
            <TouchableOpacity
              style={styles.switchButtonOff}
              onPress={() => navigation.navigate('Registro')}
            >
              <Text style={styles.textOff}>Registrar-se</Text>
            </TouchableOpacity>
        </View>

        {/* Campos de Input */}
        <TextInput
          label="Usuário"
          value={usuario}
          onChangeText={setUsuario}
          mode="outlined"
          style={styles.input}
          outlineColor="#E0E0E0"
          activeOutlineColor="#FF0050"
        />

        <TextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          mode="outlined"
          secureTextEntry={secureText}
          style={styles.input}
          outlineColor="#E0E0E0"
          activeOutlineColor="#FF0050"
          right={
            <TextInput.Icon 
              name={() => <MaterialCommunityIcons name={secureText ? "eye" : "eye-off"} size={20} />} 
              onPress={() => setSecureText(!secureText)}
            />
          }
        />

        <View style={styles.footerLinks}>
           <Text style={styles.forgotPass}>Recuperar senha</Text>
        </View>

        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('MainHome')} 
          style={styles.mainButton}
          contentStyle={{ height: 50 }}
        >
          Entrar
        </Button>
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
    borderRadius: 10,
    padding: 20,
    alignItems: 'stretch',
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
  iconCircle: {
    backgroundColor: '#FF0050',
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  textOn: { color: '#333', fontWeight: 'bold' },
  textOff: { color: '#999', fontWeight: '600' },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  forgotPass: {
    color: '#FF0050',
    fontWeight: '600',
    fontSize: 12,
  },
  mainButton: {
    backgroundColor: '#FF0050',
    borderRadius: 8,
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
});