import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getRemediosUsuario, marcarComoTomado } from '../dados/dadosRemedios';
import CardRemedio from '../componentes/CardRemedio';
import { globalStyles } from '../styles/globalStyles';

export default function HomeScreen({ navigation }) {
  const [remedios, setRemedios] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarRemedios();
    });
    return unsubscribe;
  }, [navigation]);

  const carregarRemedios = async () => {
    const listaRemedios = await getRemediosUsuario();
    setRemedios(listaRemedios);
  };

  const handleTomarRemedio = async (remedioId) => {

    await carregarRemedios();
  };

  return (
    <View style={globalStyles.screenContainer}>
      <View style={globalStyles.cardHeader}>
        <Text style={globalStyles.titulo}>Meus Remédios</Text>
        <TouchableOpacity 
          style={globalStyles.addButton}
          onPress={() => navigation.navigate('CadastrarRemedio')}
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
              onToggle={() => handleTomarRemedio(item.id)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum remédio cadastrado</Text>
          <TouchableOpacity 
            style={globalStyles.botao}
            onPress={() => navigation.navigate('CadastrarRemedio')}
          >
            <Text style={globalStyles.textoBotaoClaro}>Adicionar seu primeiro remédio</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
});