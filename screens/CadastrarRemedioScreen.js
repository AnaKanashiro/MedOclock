import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { addRemedio } from '../dados/dadosRemedios';

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

  // Estados
  const [nome, setNome] = useState('');
  const [horarioInicial, setHorarioInicial] = useState(roundTo15Minutes(new Date()));
  const [intervalo, setIntervalo] = useState(8);
  const [periodo, setPeriodo] = useState(7);
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState('un');
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
      
      // Adiciona doses enquanto estiver no mesmo dia
      while (true) {
        if (horarioDia > dataAtual) {
          horarios.push({
            horario: horarioDia.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            data: new Date(horarioDia),
            tomado: false
          });
        }
        
        // Avança no intervalo especificado
        horarioDia = new Date(horarioDia.getTime() + intervalo * 60 * 60 * 1000);
        horarioDia = roundTo15Minutes(horarioDia);
        
        // Se passou para o próximo dia, sai do loop
        if (horarioDia.getDate() !== horarioBase.getDate() + dia) break;
      }
    }
    
    // Ordena por data e limita a 10 horários
    const horariosOrdenados = horarios.sort((a, b) => a.data - b.data);
    setProximosHorarios(horariosOrdenados.slice(0, 10));
  };

  const handleCadastro = async () => {
    if (!nome || !quantidade) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }
  
    if (isNaN(quantidade) || parseFloat(quantidade) <= 0) {
      Alert.alert('Erro', 'Quantidade deve ser um número positivo');
      return;
    }

    setShowModal(true);
  };

  const confirmarCadastro = async () => {
    const novoRemedio = {
      id: Date.now(),
      nome,
      horarioInicial: horarioInicial.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      intervalo,
      periodo,
      quantidade: `${quantidade} ${unidade}`,
      proximosHorarios,
      dataCadastro: new Date().toISOString()
    };

    const success = await addRemedio(novoRemedio);
    setShowModal(false);
    
    if (success) {
      Alert.alert('Sucesso', 'Remédio cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    } else {
      Alert.alert('Erro', 'Não foi possível salvar o remédio');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Remédio*</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Paracetamol"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Horário da Primeira Dose*</Text>
      <TouchableOpacity 
        style={styles.timeButton}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.timeButtonText}>
          {horarioInicial.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Text style={styles.timeButtonSubtext}>
          {isCurrentTime(horarioInicial) ? "(Horário atual)" : "(Toque para alterar)"}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={horarioInicial}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minuteInterval={15}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setHorarioInicial(roundTo15Minutes(selectedTime));
            }
          }}
        />
      )}

      <Text style={styles.label}>Intervalo entre Doses (horas)*</Text>
      <Picker
        selectedValue={intervalo}
        style={styles.picker}
        onValueChange={(itemValue) => setIntervalo(itemValue)}
      >
        {[4, 6, 8, 12, 24].map((hora) => (
          <Picker.Item key={hora} label={`${hora} horas`} value={hora} />
        ))}
      </Picker>

      <Text style={styles.label}>Período de Tratamento (dias)*</Text>
      <Picker
        selectedValue={periodo}
        style={styles.picker}
        onValueChange={(itemValue) => setPeriodo(itemValue)}
      >
        {[1, 3, 7, 14, 30].map((dia) => (
          <Picker.Item key={dia} label={`${dia} dias`} value={dia} />
        ))}
      </Picker>

      <Text style={styles.label}>Quantidade*</Text>
      <View style={styles.quantityContainer}>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          placeholder="Ex: 2"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
        />
        <Picker
          selectedValue={unidade}
          style={[styles.picker, { flex: 1 }]}
          onValueChange={(itemValue) => setUnidade(itemValue)}
        >
          <Picker.Item label="un" value="un" />
          <Picker.Item label="ml" value="ml" />
        </Picker>
      </View>

      <Text style={styles.label}>Próximas Doses:</Text>
      <View style={styles.horariosContainer}>
        {proximosHorarios.map((horario, index) => (
          <Text key={index} style={styles.horarioText}>
            {horario.horario}
          </Text>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar Remédio</Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar Cadastro</Text>
            <Text style={styles.modalText}>Você está prestes a cadastrar:</Text>
            <Text style={styles.modalDetail}>{nome}</Text>
            <Text style={styles.modalText}>Horários calculados:</Text>
            {proximosHorarios.slice(0, 3).map((horario, index) => (
              <Text key={index} style={styles.modalDetail}>{horario.horario}</Text>
            ))}
            {proximosHorarios.length > 3 && (
              <Text style={styles.modalText}>... e mais {proximosHorarios.length - 3} horários</Text>
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmarCadastro}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  timeButton: {
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  timeButtonText: {
    fontSize: 18,
    fontWeight: '500',
  },
  timeButtonSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  horariosContainer: {
    minHeight: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  horarioText: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: 'rgb(115, 12, 12)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgb(115, 12, 12)',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalDetail: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    marginBottom: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: 'rgb(115, 12, 12)',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});