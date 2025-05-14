import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

export default function ReminderModal({ visible, remedio = {}, horario = '', onConfirm, onClose }) {
  // Provide default values for remedio and horario
  const { nome = '', quantidade = '' } = remedio;

  if (!visible) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Hora do Remédio!</Text>
          
          <View style={styles.remedioInfo}>
            <Text style={styles.remedioName}>{nome}</Text>
            <Text style={styles.remedioDose}>{quantidade}</Text>
            <Text style={styles.remedioTime}>{horario}</Text>
          </View>

          <TouchableOpacity 
            style={globalStyles.botao} 
            onPress={onConfirm}
          >
            <Text style={globalStyles.textoBotaoClaro}>Tomar Remédio</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
          >
            <MaterialIcons name="close" size={24} color="#FF5252" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FF407D',
  },
  remedioInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  remedioName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  remedioDose: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  remedioTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF407D',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});