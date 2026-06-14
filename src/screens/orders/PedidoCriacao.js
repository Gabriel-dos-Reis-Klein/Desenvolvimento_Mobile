import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, ScrollView, Alert, Modal } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import CustomDateTimePicker from '../../components/DateTime';
import { orderService } from '../../services';

const IconeVoltar = require('../../assets/return.png');

export default function PedidoCriacao({navigation}){
  const [buscaCliente, setBuscaCliente] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState(null); // objeto { id, nome, telefone } ou null
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [tipoServico, setTipoServico] = useState("CONFECCAO"); // valor padrão para API
  const [tipoPagamento, setTipoPagamento] = useState("DINHEIRO");
  const [descricaoPeca, setDescricaoPeca] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
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
      const response = await fetch("https://pontogestor.onrender.com/clientes", {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwb250by1nZXN0YW8iLCJzdWIiOiI0NTRhMDg5Yi0xM2M0LTQ5MWEtODI5MS1jY2I0NGQ4MDhiYTAifQ._7UIvHe8Xsn50NbvveUUh19vNvBti45fDAlZ1XKeSrk",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      // Garantir que data é um array
      const clientesArray = Array.isArray(data) ? data : (data.clientes || []);
      setTodosClientes(clientesArray);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);

      // Dados mock para teste enquanto a API não funciona
      const clientesMock = [
        { id: 1, nome: "João Silva", telefone: "11999999999" },
        { id: 2, nome: "Maria Santos", telefone: "11988888888" },
        { id: 3, nome: "Pedro Oliveira", telefone: "11977777777" },
      ];
      setTodosClientes(clientesMock);

      Alert.alert("Aviso", "Usando dados de teste. Verifique a conexão com o servidor.");
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
    
    // Garantir que todosClientes é um array antes de filtrar
    const clientes = Array.isArray(todosClientes) ? todosClientes : [];
    const filtrados = clientes.filter(
      (c) =>
        (c.nome && c.nome.toLowerCase().includes(termo)) ||
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

    if (cameraRollStatus.status !== 'granted') {
      alert("Precisamos de permissão para acessar suas fotos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImage(asset.uri);
      setImageBase64(asset.base64 || null);
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

  const confirmarDataAgendamento = (selectedDate) => {
    setNovaDataAgendamento(selectedDate);
    setMostrarCustomDatePicker(false);
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

    if (agendamentos.length === 0) {
      Alert.alert("Erro", "Adicione pelo menos um agendamento.");
      return;
    }

    const clienteId = clienteSelecionado.id || clienteSelecionado._id || clienteSelecionado.clienteId || clienteSelecionado.idCliente;

    if (!clienteId) {
      Alert.alert("Erro", "O cliente selecionado não é válido. Selecione novamente.");
      return;
    }

    const tituloPedido = descricaoPeca.trim();
    if (!tituloPedido) {
      Alert.alert("Erro", "Informe um título de pedido válido.");
      return;
    }

    // Encontrar data de prova e entrega a partir dos agendamentos
    const agendamentoProva = agendamentos.find(a => a.tipo === 'prova');
    const agendamentoEntrega = agendamentos.find(a => a.tipo === 'entrega');
    const dataProva = agendamentoProva ? agendamentoProva.data : null;
    const dataEntrega = agendamentoEntrega
      ? agendamentoEntrega.data
      : agendamentos.length > 0
        ? new Date(Math.max(...agendamentos.map(a => new Date(a.data).getTime()))).toISOString()
        : new Date().toISOString();
    const dataPrazo = dataEntrega;

    setLoading(true);
    try {
      // Simplificar agendamentos - remover 'id', enviar apenas tipo e data
      const agendamentosSimplificados = agendamentos.map(a => ({
        tipo: a.tipo,
        data: a.data
      }));

      const corpoJSON = {
        titulo: tituloPedido,
        descricao: descricaoPeca.trim(),
        itens: [
          {
            titulo: tituloPedido,
            descricao: descricaoPeca.trim(),
            quantidade: 1,
            valor: parseFloat(valorTotal),
            valorUnitario: parseFloat(valorTotal),
          },
        ],
        idCliente: clienteId,
        tipoPedido: tipoServico,
        dataProva: dataProva,
        dataEntrega: dataEntrega,
        dataPrazo: dataPrazo,
        pagamentoAntecipado: 0.0,
        tipoPagamento: tipoPagamento,
      };

      console.log("Enviando pedido:", JSON.stringify(corpoJSON, null, 2));

      const data = await orderService.create(corpoJSON);

      console.log("Pedido criado com sucesso:", data);

      Alert.alert("Sucesso", "Pedido criado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      
      // Extrair detalhes do erro
      let errorMsg = "Não foi possível conectar ao servidor.";
      if (error?.data) {
        console.log("Dados do erro:", error.data);
        errorMsg = error.message || "Erro na requisição";
      } else if (error?.message) {
        errorMsg = error.message;
      }
      
      Alert.alert("Erro", errorMsg);
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
        <View style={styles.selectorRow}>
          {[
            { label: "Confecção", value: "CONFECCAO" },
            { label: "Modificação", value: "MODIFICACAO" },
            { label: "Reparo", value: "REPARO" },
          ].map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.selectorOption,
                tipoServico === item.value && styles.selectorOptionActive,
              ]}
              onPress={() => setTipoServico(item.value)}
            >
              <Text
                style={
                  tipoServico === item.value
                    ? styles.selectorTextActive
                    : styles.selectorText
                }
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tipo de pagamento */}
        <Text style={styles.label}>Tipo de Pagamento *</Text>
        <View style={styles.selectorRow}>
          {[
            { label: "Dinheiro", value: "DINHEIRO" },
            { label: "Cartão", value: "CARTAO" },
            { label: "Pix", value: "PIX" },
          ].map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.selectorOption,
                tipoPagamento === item.value && styles.selectorOptionActive,
              ]}
              onPress={() => setTipoPagamento(item.value)}
            >
              <Text
                style={
                  tipoPagamento === item.value
                    ? styles.selectorTextActive
                    : styles.selectorText
                }
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
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
            <View style={styles.selectorRow}>
              {[
                { label: "Prova", value: "prova" },
                { label: "Entrega", value: "entrega" },
              ].map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.selectorOption,
                    novoTipoAgendamento === item.value && styles.selectorOptionActive,
                  ]}
                  onPress={() => setNovoTipoAgendamento(item.value)}
                >
                  <Text
                    style={
                      novoTipoAgendamento === item.value
                        ? styles.selectorTextActive
                        : styles.selectorText
                    }
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
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
  selectorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  selectorOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
  },
  selectorOptionActive: {
    backgroundColor: "#FF0050",
    borderColor: "#FF0050",
  },
  selectorText: {
    color: "#333",
    fontSize: 14,
  },
  selectorTextActive: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
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