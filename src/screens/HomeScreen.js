import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  getRemediosUsuario,
  marcarComoTomado,
  deletarRemedio,
} from "../dados/dadosRemedios";
import CardRemedio from "../componentes/CardRemedio";
import { globalStyles } from "../styles/globalStyles";


export default function HomeScreen({ navigation}) {
  const [remedios, setRemedios] = useState([]);

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
              onDelete={handleDeleteRemedio} // Adicionado aqui
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
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
});
