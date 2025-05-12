import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../styles/globalStyles";

export default function LogInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    try {
      const usuariosString = await AsyncStorage.getItem("usuarios");
      const usuarios = usuariosString ? JSON.parse(usuariosString) : [];

      const usuario = usuarios.find(
        (u) => u.email === email && u.senha === senha
      );

      if (usuario) {
        navigation.navigate("Home");
      } else {
        setErro("Email ou senha incorretos");
      }
    } catch (error) {
      setErro("Erro ao acessar dados");
    }
  };

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.titulo}>Login</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {erro ? <Text style={globalStyles.erro}>{erro}</Text> : null}

      <TouchableOpacity style={globalStyles.botao} onPress={handleLogin}>
        <Text style={globalStyles.textoBotaoClaro}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  link: {
    color: "#FFCAD4",
    textAlign: "center",
    marginTop: 20,
  },
});
