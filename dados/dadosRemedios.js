import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from './AuthService';

const STORAGE_KEY = '@MedOClock:remedios';
let remedios = [];

export const getRemedios = () => [...remedios];

export const loadRemedios = async () => {
  try {
    const user = getAuth().currentUser;
    if (!user) return [];
    
    const userKey = `${STORAGE_KEY}:${user.uid}`;
    const storedData = await AsyncStorage.getItem(userKey);
    remedios = storedData ? JSON.parse(storedData) : [];
    return [...remedios];
  } catch (error) {
    console.error('Erro ao carregar remédios:', error);
    return [];
  }
};

export const addRemedio = async (novoRemedio) => {
  try {
    const user = getAuth().currentUser;
    if (!user) throw new Error('Usuário não autenticado');
    
    novoRemedio.userId = user.uid;
    remedios.push(novoRemedio);
    await saveRemedios();
    return true;
  } catch (error) {
    console.error('Erro ao adicionar remédio:', error);
    return false;
  }
};

const saveRemedios = async () => {
  const user = getAuth().currentUser;
  if (!user) return false;
  
  const userKey = `${STORAGE_KEY}:${user.uid}`;
  await AsyncStorage.setItem(userKey, JSON.stringify(remedios));
  return true;
};

export const marcarComoTomado = async (remedioId, horarioIndex) => {
    try {
      const remedio = remedios.find(r => r.id === remedioId);
      if (remedio && remedio.proximosHorarios[horarioIndex]) {
        remedio.proximosHorarios[horarioIndex].tomado = true;
        await saveRemedios();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao marcar como tomado:', error);
      return false;
    }
  };

// Carrega ao iniciar se usuário estiver logado
if (getAuth().currentUser) {
  loadRemedios();
}