import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView
} from 'react-native';
import { getRemedios, loadRemedios, marcarComoTomado } from '../dados/dadosRemedios';

export default function HomeScreen({ navigation }) {
  const [remedios, setRemedios] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarRemedios();
    });
    return unsubscribe;
  }, [navigation]);

  const carregarRemedios = async () => {
    await loadRemedios();
    setRemedios(getRemedios());
  };

  const handleTomarRemedio = async (remedioId, horarioIndex) => {
    await marcarComoTomado(remedioId, horarioIndex);
    await carregarRemedios();
  };

  const renderRemedio = ({ item }) => {
    const proximaDose = item.proximosHorarios.find(h => !h.tomado);
    
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.nomeRemedio}>{item.nome}</Text>
          <Text style={styles.doseRemedio}>{item.quantidade}</Text>
        </View>
        
        {proximaDose ? (
          <>
            <Text style={styles.proximaDose}>
              Próxima dose: {proximaDose.horario}
            </Text>
            <TouchableOpacity 
              style={styles.tomarButton}
              onPress={() => handleTomarRemedio(item.id, item.proximosHorarios.indexOf(proximaDose))}
            >
              <Text style={styles.tomarButtonText}>Marcar como tomado</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.completo}>Tratamento completo!</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Remédios</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('CadastrarRemedio')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {remedios.length > 0 ? (
        <FlatList
          data={remedios}
          renderItem={renderRemedio}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhum remédio cadastrado</Text>
          <TouchableOpacity 
            style={styles.emptyButton}
            onPress={() => navigation.navigate('CadastrarRemedio')}
          >
            <Text style={styles.emptyButtonText}>Adicionar Remédio</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(115, 12, 12)',
  },
  addButton: {
    backgroundColor: 'rgb(115, 12, 12)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    lineHeight: 40,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nomeRemedio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  doseRemedio: {
    fontSize: 16,
    color: 'rgb(115, 12, 12)',
  },
  proximaDose: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  tomarButton: {
    backgroundColor: 'rgb(115, 12, 12)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  tomarButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  completo: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: 'rgb(115, 12, 12)',
    padding: 15,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});