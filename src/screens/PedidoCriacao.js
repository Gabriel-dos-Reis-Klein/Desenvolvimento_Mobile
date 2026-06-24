import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, ScrollView, Alert, Platform, Modal } from "react-native";
import { TextInput, Button, Menu } from 'react-native-paper';
import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Picker } from "@react-native-picker/picker";
import CustomDateTimePicker from '../components/DateTime';

const IconeVoltar = require('../assets/return.png');

export default function PedidoCriacao({navigation}){
  const [buscaCliente, setBuscaCliente] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState(null); // objeto { id, nome, telefone } ou null
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [tipoServico, setTipoServico] = useState("confecção"); // valor padrão
  const [descricaoPeca, setDescricaoPeca] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [carregandoClientes, setCarregandoClientes] = useState(false);
  const [todosClientes, setTodosClientes] = useState([]);

  const [agendamentos, setAgendamentos] = useState([]);

  const [modalAgendamentoVisivel, setModalAgendamentoVisivel] = useState(false);
  const [novoTipoAgendamento, setNovoTipoAgendamento] = useState("prova");
  const [novaDataAgendamento, setNovaDataAgendamento] = useState(new Date());
  const [mostrarCustomDatePicker, setMostrarCustomDatePicker] = useState(false);

    useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    setCarregandoClientes(true);
    try {
      const response = await fetch("https://ponto-gestor.onrender.com/api/clientes"); // substitua pela URL real
      const data = await response.json();
      setTodosClientes(data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de clientes.");
    } finally {
      setCarregandoClientes(false);
    }
  };

  // Filtragem local conforme o usuário digita
  const filtrarClientes = (texto) => {
    setBuscaCliente(texto);
    if (!texto || texto.length < 2) {
      setClientesFiltrados([]);
      return;
    }
    const termo = texto.toLowerCase();
    const filtrados = todosClientes.filter(
      (c) =>
        c.nome.toLowerCase().includes(termo) ||
        (c.telefone && c.telefone.includes(termo))
    );
    setClientesFiltrados(filtrados);
  };

  // Seleciona um cliente da lista e fecha a sugestão
  const selecionarCliente = (cliente) => {
    setClienteSelecionado(cliente);
    setBuscaCliente(cliente.nome); // exibe o nome no campo
    setClientesFiltrados([]);
  };

  // Limpa a seleção quando o campo for alterado manualmente
  const handleMudancaBusca = (texto) => {
    // Se o usuário está apagando o nome, removemos a seleção
    if (clienteSelecionado && texto !== clienteSelecionado.nome) {
      setClienteSelecionado(null);
    }
    filtrarClientes(texto);
  };

  const selecionarFoto = async () => {
    const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const mediaLibStatus = await MediaLibrary.requestPermissionsAsync();

    if (cameraRollStatus.status !== 'granted' || mediaLibStatus.status !== 'granted') {
      alert("Precisamos de permissão para acessar suas fotos!");
      return;
    }

    // 2. Abrir a galeria para o usuário escolher
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uriOriginal = result.assets[0].uri;
      setImage(uriOriginal);
    }  
  };
  


  const abrirModalAgendamento = () => {
    setNovoTipoAgendamento("prova");
    setNovaDataAgendamento(new Date());
    setModalAgendamentoVisivel(true);
  };

  const adicionarAgendamento = () => {
    const novo = {
      id: Date.now().toString(),
      tipo: novoTipoAgendamento,
      data: novaDataAgendamento.toISOString(),
    };
    setAgendamentos([...agendamentos, novo]);
    setModalAgendamentoVisivel(false);
  };

  const removerAgendamento = (id) => {
    setAgendamentos(agendamentos.filter((a) => a.id !== id));
  };

  const onChangeDateModal = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setMostrarDatePickerModal(false);
    }
    if (selectedDate) {
      setNovaDataAgendamento(selectedDate);
    }
  };

  const uriToBase64 = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result; // "data:image/jpeg;base64,..."
      // Se a API espera apenas a string sem o prefixo, remova:
      const pureBase64 = base64.split(',')[1];
      resolve(pureBase64); // ou resolve(base64) se precisar do prefixo completo
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

  // Função de POST para criar pedido
  const criarPedido = async () => {
    // Validações
    if (!clienteSelecionado) {
      Alert.alert("Erro", "Selecione um cliente válido.");
      return;
    }
    if (!valorTotal || isNaN(parseFloat(valorTotal))) {
      Alert.alert("Erro", "Informe um valor válido.");
      return;
    }

    let imagemBase64 = null;
      if (image) {
        imagemBase64 = await uriToBase64(image);
      }

    setLoading(true);
    try {
      const corpoJSON = {
      cliente_id: clienteSelecionado.id,
      tipo_servico: tipoServico,
      descricao_peca: descricaoPeca.trim(),
      valor_total: parseFloat(valorTotal),
      status: "pendente",
      agendamentos: agendamentos, // Array de objetos, agora diretamente no JSON
      imagem: imagemBase64, // string base64 (ou null)
    };
        const headers = {
      'Content-Type': 'application/json',
    };

      const response = await fetch("https://ponto-gestor.onrender.com/api/pedidos", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(corpoJSON)
        // Não defina Content-Type, o fetch coloca o boundary automaticamente
      });

    console.log("Status:", response.status);
    const respostaTexto = await response.text();
    console.log("Resposta:", respostaTexto);

      if (response.ok) {
        Alert.alert("Sucesso", "Pedido criado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", `Status ${response.status}: ${respostaTexto}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
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
      <Text style={styles.title}>Criar Pedido</Text>
      <TextInput
          placeholder="Digite nome ou telefone para buscar"
          value={buscaCliente}
          onChangeText={handleMudancaBusca}
          mode="outlined"
          style={styles.input}
          theme={{
            colors: {
              text: "#000000",
              onSurface: "#000000",
              primary: "#FF0050",
              placeholder: "#666",
            },
          }}
          outlineColor="#E0E0E0"
          activeOutlineColor="#FF0050"
        />
        {carregandoClientes && (
          <ActivityIndicator
            size="small"
            color="#FF0050"
            style={{ marginBottom: 10 }}
          />
        )}
        {/* Lista de sugestões */}
        {clientesFiltrados.length > 0 && !clienteSelecionado && (
          <View style={styles.sugestoesContainer}>
            <FlatList
              data={clientesFiltrados}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemSugestao}
                  onPress={() => selecionarCliente(item)}
                >
                  <Text style={styles.nomeCliente}>{item.nome}</Text>
                  {item.telefone && (
                    <Text style={styles.telefoneCliente}>{item.telefone}</Text>
                  )}
                </TouchableOpacity>
              )}
              nestedScrollEnabled
              style={{ maxHeight: 150 }}
            />
          </View>
        )}

        {/* Tipo de serviço */}
        <Text style={styles.label}>Tipo de Serviço *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={tipoServico}
            onValueChange={(itemValue) => setTipoServico(itemValue)}
            style={styles.picker}
            dropdownIconColor="#FF0050"
          >
            <Picker.Item label="Confecção" value="confecção" />
            <Picker.Item label="Modificação" value="modificação" />
            <Picker.Item label="Reparo" value="reparo" />
          </Picker>
        </View>

        {/* Descrição da peça */}
        <TextInput
          label="Descrição da peça"
          value={descricaoPeca}
          onChangeText={setDescricaoPeca}
          mode="outlined"
          multiline
          style={[styles.input, { height: 100 }]}
          theme={{
            colors: {
              text: "#000000",
              onSurface: "#000000",
              primary: "#FF0050",
              placeholder: "#666",
            },
          }}
          outlineColor="#E0E0E0"
          activeOutlineColor="#FF0050"
        />

        {/* Valor total */}
        <TextInput
          label="Valor do pedido (R$)"
          value={valorTotal}
          onChangeText={setValorTotal}
          mode="outlined"
          keyboardType="decimal-pad"
          style={styles.input}
          theme={{
            colors: {
              text: "#000000",
              onSurface: "#000000",
              primary: "#FF0050",
              placeholder: "#666",
            },
          }}
          outlineColor="#E0E0E0"
          activeOutlineColor="#FF0050"
        />

        <Text style={styles.label}>Agendamentos *</Text>
        {agendamentos.map((item) => (
          <View key={item.id} style={styles.agendamentoItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.agendamentoTipo}>
                {item.tipo === "prova" ? "Prova" : "Entrega"}
              </Text>
              <Text style={styles.agendamentoData}>
                {new Date(item.data).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removerAgendamento(item.id)}>
              <Text style={styles.removerAgendamento}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={styles.adicionarAgendamentoButton}
          onPress={abrirModalAgendamento}
        >
          <Text style={styles.adicionarAgendamentoText}>+ Adicionar agendamento</Text>
        </TouchableOpacity>

        {/* Anexar foto */}
        <Text style={styles.label}>Foto (opcional)</Text>
        <TouchableOpacity
          style={styles.fotoButton}
          onPress={selecionarFoto}
        >
          <Text style={styles.fotoButtonText}>Escolher foto</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={styles.previewImage} />
        )}

        {/* Botão de envio */}
        <Button
          mode="contained"
          loading={loading}
          disabled={loading}
          onPress={criarPedido}
          style={styles.mainButton}
          contentStyle={{ height: 50 }}
        >
          Criar Pedido
        </Button>
    </View>
          <Modal
        visible={modalAgendamentoVisivel}
        transparent
        animationType="slide"
        onRequestClose={() => setModalAgendamentoVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Agendamento</Text>

            <Text style={styles.label}>Tipo:</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={novoTipoAgendamento}
                onValueChange={(itemValue) => setNovoTipoAgendamento(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Prova" value="prova" />
                <Picker.Item label="Entrega" value="entrega" />
              </Picker>
            </View>

            <Text style={styles.label}>Data e hora:</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setMostrarCustomDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {novaDataAgendamento.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Text>
              <Text style={styles.dateIcon}>📅</Text>
            </TouchableOpacity>

            {/* Substituído o DateTimePicker pelo nosso componente customizado */}
            {mostrarCustomDatePicker && (
              <CustomDateTimePicker
                visible={mostrarCustomDatePicker}
                currentDate={novaDataAgendamento}
                onConfirm={confirmarDataAgendamento}
                onCancel={() => setMostrarCustomDatePicker(false)}
              />
            )}

            <View style={styles.modalBotoes}>
              <Button
                mode="outlined"
                onPress={() => setModalAgendamentoVisivel(false)}
                style={{ flex: 1, marginRight: 10 }}
              >
                Cancelar
              </Button>
              <Button
                mode="contained"
                onPress={adicionarAgendamento}
                style={{ flex: 1, backgroundColor: "#FF0050" }}
              >
                Adicionar
              </Button>
            </View>
          </View>
        </View>
      </Modal>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  customIcon: {
    width: 26,
    height: 26,
  },
  input: {
    marginBottom: 12,
    backgroundColor: "white",
  },
  headerButtons: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  mainButton: {
    backgroundColor: "#FF0050",
    borderRadius: 8,
    marginTop: 20,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    marginLeft: 4,
  },
  sugestoesContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginTop: -10,
    marginBottom: 12,
    backgroundColor: "#fff",
    elevation: 3,
  },
  itemSugestao: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  nomeCliente: {
    fontSize: 16,
    color: "#000",
  },
  telefoneCliente: {
    fontSize: 13,
    color: "#666",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: 12,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#000",
  },
  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 12,
    marginBottom: 12,
  },
  dateText: {
    color: "#000",
    fontSize: 16,
  },
  dateIcon: {
    fontSize: 20,
  },
  fotoButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  fotoButtonText: {
    color: "#333",
    fontSize: 16,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: "center",
  },
  // Estilos para agendamentos
  agendamentoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 5,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  agendamentoTipo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF0050",
  },
  agendamentoData: {
    fontSize: 13,
    color: "#555",
  },
  removerAgendamento: {
    fontSize: 18,
    color: "#999",
    padding: 5,
  },
  adicionarAgendamentoButton: {
    borderWidth: 1,
    borderColor: "#FF0050",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  adicionarAgendamentoText: {
    color: "#FF0050",
    fontWeight: "bold",
  },
  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalBotoes: {
    flexDirection: "row",
    marginTop: 20,
  },
});