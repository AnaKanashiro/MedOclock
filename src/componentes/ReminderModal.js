import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

export default function ReminderModal({ visible, remedio, onClose, onConfirm }) {
  if (!remedio) return null;

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
            <Text style={styles.remedioName}>{remedio.nome}</Text>
            <Text style={styles.remedioDose}>{remedio.quantidade}</Text>
            <Text style={styles.remedioTime}>
              Horário: {remedio.proximosHorarios?.find(d => !d.tomado)?.horario}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[globalStyles.botao, styles.button]} 
              onPress={onConfirm}
            >
              <Text style={globalStyles.textoBotaoClaro}>Remédio Tomado</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.secondaryButton, styles.button]} 
              onPress={onClose}
            >
              <Text style={styles.secondaryButtonText}>Lembrar mais tarde</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
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
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  remedioName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  remedioDose: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  remedioTime: {
    fontSize: 16,
    color: '#FF407D',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: 10,
  },
  secondaryButton: {
    padding: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#757575',
  },
});