import AsyncStorage from "@react-native-async-storage/async-storage";

export const addRemedio = async (novoRemedio) => {
  try {
    // Obter o email do usuário logado
    const usuarioLogado = await AsyncStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
      console.error("Nenhum usuário logado encontrado");
      return false;
    }

    const { email } = JSON.parse(usuarioLogado);
    
    // Obter a lista de usuários
    const usuariosString = await AsyncStorage.getItem("usuarios");
    const usuarios = usuariosString ? JSON.parse(usuariosString) : [];
    
    // Encontrar o usuário atual
    const usuarioIndex = usuarios.findIndex(u => u.email === email);
    if (usuarioIndex === -1) {
      console.error("Usuário não encontrado");
      return false;
    }
    
    // Inicializar a lista de remédios se não existir
    if (!usuarios[usuarioIndex].remedios) {
      usuarios[usuarioIndex].remedios = [];
    }
    
    // Adicionar o novo remédio
    usuarios[usuarioIndex].remedios.push(novoRemedio);
    
    // Salvar a lista atualizada
    await AsyncStorage.setItem("usuarios", JSON.stringify(usuarios));
    return true;
    
  } catch (error) {
    console.error("Erro ao adicionar remédio:", error);
    return false;
  }
};

// Função para obter os remédios do usuário atual
export const getRemediosUsuario = async () => {
  try {
    const usuarioLogado = await AsyncStorage.getItem("usuarioLogado");
    if (!usuarioLogado) return [];

    const { email } = JSON.parse(usuarioLogado);
    const usuariosString = await AsyncStorage.getItem("usuarios");
    const usuarios = usuariosString ? JSON.parse(usuariosString) : [];
    
    const usuario = usuarios.find(u => u.email === email);
    return usuario?.remedios || [];
    
  } catch (error) {
    console.error("Erro ao obter remédios:", error);
    return [];
  }
};

export const deletarRemedio = async (remedioId) => {
  try {
    const usuarioLogado = await AsyncStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
      console.error("Nenhum usuário logado encontrado");
      return false;
    }

    const { email } = JSON.parse(usuarioLogado);
    
    const usuariosString = await AsyncStorage.getItem("usuarios");
    const usuarios = usuariosString ? JSON.parse(usuariosString) : [];
    
    const usuarioIndex = usuarios.findIndex(u => u.email === email);
    if (usuarioIndex === -1) {
      console.error("Usuário não encontrado");
      return false;
    }
    
    if (!usuarios[usuarioIndex].remedios) {
      console.error("Nenhum remédio cadastrado");
      return false;
    }
    
    const remediosAtualizados = usuarios[usuarioIndex].remedios.filter(
      remedio => remedio.id !== remedioId
    );

    usuarios[usuarioIndex].remedios = remediosAtualizados;
  
    await AsyncStorage.setItem("usuarios", JSON.stringify(usuarios));
    return true;
    
  } catch (error) {
    console.error("Erro ao deletar remédio:", error);
    return false;
  }
};

// Adicione esta função para marcar o remédio como tomado
export const marcarComoTomado = async (remedioId, horarioTomado) => {
  try {
    const usuarioLogado = await AsyncStorage.getItem("usuarioLogado");
    if (!usuarioLogado) return false;

    const { email } = JSON.parse(usuarioLogado);
    const usuariosString = await AsyncStorage.getItem("usuarios");
    const usuarios = usuariosString ? JSON.parse(usuariosString) : [];
    
    const usuarioIndex = usuarios.findIndex(u => u.email === email);
    if (usuarioIndex === -1) return false;

    const remedioIndex = usuarios[usuarioIndex].remedios.findIndex(r => r.id === remedioId);
    if (remedioIndex === -1) return false;

    const proximosHorarios = usuarios[usuarioIndex].remedios[remedioIndex].proximosHorarios;
    const doseIndex = proximosHorarios.findIndex(d => d.horario === horarioTomado);
    if (doseIndex !== -1) {
      proximosHorarios[doseIndex].tomado = true;
    }

    await AsyncStorage.setItem("usuarios", JSON.stringify(usuarios));
    return true;
  } catch (error) {
    console.error("Erro ao marcar remédio como tomado:", error);
    return false;
  }
};

// export const logout = async () => {
//   try {
//     await AsyncStorage.removeItem("usuarioLogado");
//     return true;
//   } catch (error) {
//     console.error("Erro ao fazer logout:", error);
//     return false;
//   }
// };