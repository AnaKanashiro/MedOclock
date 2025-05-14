import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  AppState,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  getRemediosUsuario,
  marcarComoTomado,
  deletarRemedio,
} from "../dados/dadosRemedios";
import CardRemedio from "../componentes/CardRemedio";
import ReminderModal from "../componentes/ReminderModal";
import { globalStyles } from "../styles/globalStyles";

export default function HomeScreen({ navigation }) {
  const [remedios, setRemedios] = useState([]);
  const [activeReminder, setActiveReminder] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);

  const carregarRemedios = async () => {
    const lista = await getRemediosUsuario();
    setRemedios(lista);
  };

  const handleDeleteRemedio = async (remedioId) => {
    const success = await deletarRemedio(remedioId);
    if (success) {
      await carregarRemedios();
    }
  };

  // Verifica se há remédios para serem tomados
  const checkReminders = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (const remedio of remedios) {
      for (const dose of remedio.proximosHorarios) {
        if (!dose.tomado) {
          const [hours, minutes] = dose.horario.split(':').map(Number);
          const doseMinutes = hours * 60 + minutes;
          
          // Verifica se faltam 5 minutos ou se já passou do horário
          if (Math.abs(doseMinutes - currentMinutes) <= 5 || doseMinutes <= currentMinutes) {
            setActiveReminder({
              remedio,
              horario: dose.horario,
              remedioId: remedio.id
            });
            return;
          }
        }
      }
    }
    setActiveReminder(null);
  };

  const handleConfirmReminder = async () => {
    if (activeReminder) {
      const success = await marcarComoTomado(
        activeReminder.remedioId,
        activeReminder.horario
      );
      if (success) {
        await carregarRemedios();
        setActiveReminder(null);
      }
    }
  };

  // Verifica os lembretes quando o app é aberto ou quando o estado muda
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
      if (nextAppState === 'active') {
        checkReminders();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Verifica os lembretes quando os remédios são carregados ou a cada minuto
  useEffect(() => {
    if (remedios.length > 0) {
      checkReminders();
      
      // Verifica a cada minuto
      const interval = setInterval(() => {
        checkReminders();
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [remedios]);

  useEffect(() => {
    carregarRemedios();
  }, []);

  return (
    <View style={globalStyles.screenContainer}>
      <View style={globalStyles.cardHeader}>
        <Text style={globalStyles.titulo}>Meus Remédios</Text>
        <TouchableOpacity
          style={globalStyles.addButton}
          onPress={() => navigation.navigate("CadastrarRemedio")}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {remedios.length > 0 ? (
        <FlatList
          data={remedios}
          renderItem={({ item }) => (
            <CardRemedio
              remedio={item}
              onDelete={handleDeleteRemedio}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum remédio cadastrado</Text>
          <TouchableOpacity
            style={globalStyles.botao}
            onPress={() => navigation.navigate("CadastrarRemedio")}
          >
            <Text style={globalStyles.textoBotaoClaro}>
              Adicionar seu primeiro remédio
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ReminderModal
        visible={!!activeReminder}
        remedio={activeReminder?.remedio}
        horario={activeReminder?.horario}
        onConfirm={handleConfirmReminder}
        onClose={() => setActiveReminder(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
});