import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Certifique-se de ter instalado @expo/vector-icons
import { globalStyles } from '../styles/globalStyles';

export default function CardRemedio({ remedio, onToggle }) {
  // Encontra a próxima dose não tomada
  const proximaDose = remedio.proximosHorarios.find(dose => !dose.tomado);

  return (
    <View style={globalStyles.card}>
      <View style={globalStyles.cardHeader}>
        <Text style={globalStyles.textoBotao}>{remedio.nome}</Text>
        <TouchableOpacity onPress={onToggle}>
          <MaterialIcons 
            name={proximaDose?.tomado ? "check-box" : "check-box-outline-blank"} 
            size={24} 
            color={proximaDose?.tomado ? "#4CAF50" : "#757575"} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <MaterialIcons name="access-time" size={20} color="#FF407D" />
          <Text style={styles.infoText}>
            {proximaDose ? proximaDose.horario : 'Nenhuma dose pendente'}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
});