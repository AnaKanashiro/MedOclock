import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { addRemedio } from "../dados/dadosRemedios";
import { globalStyles } from "../styles/globalStyles";

export default function CadastrarRemedioScreen({ navigation }) {
  // Arredonda o horário atual para o múltiplo de 15 minutos mais próximo
  const roundTo15Minutes = (date) => {
    const minutes = date.getMinutes();
    const roundedMinutes = Math.floor(minutes / 15) * 15;
    const newDate = new Date(date);
    newDate.setMinutes(roundedMinutes, 0, 0);
    return newDate;
  };

  // Verifica se o horário é igual ao horário atual arredondado
  const isCurrentTime = (time) => {
    const now = new Date();
    const roundedNow = roundTo15Minutes(now);
    return (
      time.getHours() === roundedNow.getHours() &&
      time.getMinutes() === roundedNow.getMinutes()
    );
  };


  const [nome, setNome] = useState("");
  const [horarioInicial, setHorarioInicial] = useState(
    roundTo15Minutes(new Date())
  );
  const [intervalo, setIntervalo] = useState(8);
  const [periodo, setPeriodo] = useState(7);
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("un");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [proximosHorarios, setProximosHorarios] = useState([]);

  // Calcula os próximos horários quando algum parâmetro muda
  useEffect(() => {
    calcularHorarios();
  }, [horarioInicial, intervalo, periodo]);

  const calcularHorarios = () => {
    const horarios = [];
    const dataAtual = new Date();
    const horarioBase = roundTo15Minutes(horarioInicial);

    // Calcula para o período especificado
    for (let dia = 0; dia < periodo; dia++) {
      let horarioDia = new Date(horarioBase);
      horarioDia.setDate(horarioBase.getDate() + dia);

      const dosesPorDia = Math.floor(24 / intervalo);

      for (let dose = 0; dose < dosesPorDia; dose++) {
        const novoHorario = new Date(
          horarioDia.getTime() + dose * intervalo * 60 * 60 * 1000
        );

        if (novoHorario > dataAtual) {
          horarios.push({
            horario: novoHorario.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            data: new Date(novoHorario),
            tomado: false,
          });
        }
      }
    }

    const horariosOrdenados = horarios.sort((a, b) => a.data - b.data);
    setProximosHorarios(horariosOrdenados.slice(0, 25));
  };

  const handleCadastro = async () => {
    if (!nome || !quantidade) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    if (isNaN(quantidade) || parseFloat(quantidade) <= 0) {
      Alert.alert("Erro", "Quantidade deve ser um número positivo");
      return;
    }

    setShowModal(true);
  };

  const confirmarCadastro = async () => {
    const novoRemedio = {
      id: Date.now(),
      nome,
      horarioInicial: horarioInicial.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      intervalo,
      periodo,
      quantidade: `${quantidade} ${unidade}`,
      proximosHorarios,
      dataCadastro: new Date().toISOString(),
    };

    const success = await addRemedio(novoRemedio);
    setShowModal(false);

    if (success) {
      Alert.alert("Sucesso", "Remédio cadastrado com sucesso!");
      navigation.navigate("Home");
    } else {
      Alert.alert("Erro", "Não foi possível salvar o remédio");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={globalStyles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={globalStyles.screenContainer}>
        <Text style={globalStyles.subtitulo}>Nome do Remédio*</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Ex: Paracetamol"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={globalStyles.subtitulo}>Horário da Primeira Dose*</Text>
        <TouchableOpacity
          style={globalStyles.tempoBotao}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={globalStyles.textoBotao}>
            {horarioInicial.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Text style={globalStyles.legenda}>
            {isCurrentTime(horarioInicial)
              ? "(Horário atual)"
              : "(Toque para alterar)"}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={horarioInicial}
            mode="time"
            is24Hour={true}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            minuteInterval={15}
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) {
                setHorarioInicial(roundTo15Minutes(selectedTime));
              }
            }}
          />
        )}

        <View style={globalStyles.pickerContainer}>
          <Text style={globalStyles.subtitulo}>
            Intervalo entre Doses (horas)*
          </Text>
          <View style={globalStyles.pickerWrapper}>
            <Picker
              selectedValue={intervalo}
              style={globalStyles.picker}
              itemStyle={globalStyles.pickerItem}
              onValueChange={(itemValue) => setIntervalo(itemValue)}
            >
              {[4, 6, 8, 12, 24].map((hora) => (
                <Picker.Item key={hora} label={`${hora} horas`} value={hora} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={globalStyles.pickerContainer}>
          <Text style={globalStyles.subtitulo}>
            Período de Tratamento (dias)*
          </Text>
          <View>
            <TextInput
              style={[globalStyles.input, { flex: 2 }]}
              placeholder="Ex: 7"
              keyboardType="numeric"
              value={periodo}
              onChangeText={setPeriodo}
            />
          </View>
        </View>

        <Text style={globalStyles.subtitulo}>Quantidade*</Text>
        <View style={styles.quantityContainer}>
          <TextInput
            style={[globalStyles.input, { flex: 2 }]}
            placeholder="Ex: 2"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
          />
          <View style={[globalStyles.pickerWrapper, { flex: 1 }]}>
            <Picker
              selectedValue={unidade}
              style={globalStyles.picker}
              onValueChange={(itemValue) => setUnidade(itemValue)}
            >
              <Picker.Item label="und" value="un" />
              <Picker.Item label="ml" value="ml" />
            </Picker>
          </View>
        </View>

        <Text style={globalStyles.subtitulo}>Próximas Doses:</Text>
        <View style={globalStyles.textoContainer}>
          {proximosHorarios.map((horario, index) => (
            <Text key={index} style={globalStyles.text}>
              {horario.horario}
            </Text>
          ))}
        </View>

        <TouchableOpacity style={globalStyles.botao} onPress={handleCadastro}>
          <Text style={globalStyles.textoBotaoClaro}>Cadastrar Remédio</Text>
        </TouchableOpacity>

        <Modal
          visible={showModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={globalStyles.modalContainer}>
            <View style={globalStyles.modalContent}>
              <Text style={globalStyles.subtitulo}>Confirmar Cadastro</Text>
              <Text style={globalStyles.modalText}>
                Você está prestes a cadastrar:
              </Text>
              <Text style={globalStyles.modalDetail}>{nome}</Text>
              <Text style={globalStyles.modalText}>Horários calculados:</Text>
              {proximosHorarios.slice(0, 3).map((horario, index) => (
                <Text key={index} style={globalStyles.modalDetail}>
                  {horario.horario}
                </Text>
              ))}
              {proximosHorarios.length > 3 && (
                <Text style={globalStyles.modalText}>
                  ... e mais {proximosHorarios.length - 3} horários
                </Text>
              )}

              <View style={globalStyles.modalButtons}>
                <TouchableOpacity
                  style={[globalStyles.modalButton, globalStyles.cancelButton]}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={globalStyles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[globalStyles.modalButton, globalStyles.confirmButton]}
                  onPress={confirmarCadastro}
                >
                  <Text style={globalStyles.modalButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
});
