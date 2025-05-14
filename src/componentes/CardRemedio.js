import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Certifique-se de ter instalado @expo/vector-icons
import { globalStyles } from "../styles/globalStyles";

export default function CardRemedio({ remedio, onDelete }) {
  // Encontra a próxima dose não tomada
  const proximaDose = remedio.proximosHorarios.find((dose) => !dose.tomado);

  const handleDelete = () => {
    Alert.alert(
      "Confirmar exclusão",
      `Deseja realmente deletar o remédio ${remedio.nome}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          onPress: () => onDelete(remedio.id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={globalStyles.card}>
      <View style={globalStyles.cardHeader}>
        <Text style={globalStyles.textoBotao}>{remedio.nome}</Text>

        <View style={styles.actionsContainer}>
          {/* Ícone de deletar */}
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <MaterialIcons name="delete" size={24} color="#FF5252" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <MaterialIcons name="access-time" size={20} color="#FF407D" />
          <Text style={styles.infoText}>
            {proximaDose ? proximaDose.horario : "Nenhuma dose pendente"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="exposure" size={20} color="#FF407D" />
          <Text style={styles.infoText}>{remedio.quantidade}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 20,
    color: "#555",
  },
});
