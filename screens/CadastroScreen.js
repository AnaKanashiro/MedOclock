import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../styles/globalStyles";

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [erro, setErro] = useState("");

  const abrirTermosDeUso = () => {
    navigation.navigate("TermosDeUso");
  };

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    if (!aceitouTermos) {
      setErro("Você deve aceitar os termos de uso");
      return;
    }

    try {
      const usuariosString = await AsyncStorage.getItem("usuarios");
      const usuarios = usuariosString ? JSON.parse(usuariosString) : [];

      const usuarioExistente = usuarios.find((u) => u.email === email);
      if (usuarioExistente) {
        setErro("Email já cadastrado");
        return;
      }

      const novoUsuario = { nome, email, senha };
      usuarios.push(novoUsuario);

      await AsyncStorage.setItem("usuarios", JSON.stringify(usuarios));
      navigation.navigate("LogIn");
    } catch (error) {
      setErro("Erro ao cadastrar usuário");
    }
  };

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.titulo}>Cadastro</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

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

      <TextInput
        style={globalStyles.input}
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <View style={styles.termosContainer}>
        <Switch value={aceitouTermos} onValueChange={setAceitouTermos} />
        <View style={styles.termosTextoContainer}>
          <Text style={globalStyles.textClaro}>Concordo com os </Text>
          <TouchableOpacity onPress={abrirTermosDeUso}>
            <Text style={styles.termosLink}> Termos de Uso e Política de Privacidade (LGPD)</Text>
          </TouchableOpacity>
        </View>
      </View>

      {erro ? <Text style={globalStyles.erro}>{erro}</Text> : null}

      <TouchableOpacity style={globalStyles.botao} onPress={handleCadastro}>
        <Text style={globalStyles.textClaro}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
        <Text style={styles.link}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  termosTexto: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
  },
  link: {
    color: "#FFCAD4",
    textAlign: "center",
    marginTop: 20,
  },
  termosContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  termosTextoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginLeft: 10,
    flex: 1,
  },
  termosLink: {
    color: "#FF407D",
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 14,
  },
});
