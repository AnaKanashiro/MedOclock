import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadRemedios } from './dadosRemedios';

const USER_KEY = '@MedOClock:users';
let currentUser = null;

export const getAuth = () => ({
  currentUser,
  
  login: async (email, senha) => {
    try {
      const usuariosString = await AsyncStorage.getItem(USER_KEY);
      const usuarios = usuariosString ? JSON.parse(usuariosString) : [];
      
      const usuario = usuarios.find(u => u.email === email && u.senha === senha);
      
      if (usuario) {
        currentUser = { 
          uid: usuario.email, // Usando email como ID único
          email: usuario.email,
          nome: usuario.nome 
        };
        await loadRemedios();
        return currentUser;
      }
      return null;
    } catch (error) {
      console.error('Erro no login:', error);
      return null;
    }
  },
  
  logout: () => {
    currentUser = null;
  },
  
  getCurrentUser: () => currentUser
});