import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#40679E', 
    justifyContent: "center",
    padding: 20
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    color: "#FFCAD4",
  },
  input: {
    height: 50,
    borderColor: "#FFE3CA",
    backgroundColor: "#FFE3CA",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: "#FF407D"
  },
  botao: {
    backgroundColor: "#FF407D",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  erro: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    color: '#1B3C73' 
  },
  textClaro: {
    color: '#FEF3E2' 
  },
  card: {
    backgroundColor: "rgb(255, 255, 201)",
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
    botaoContainer: {
    marginTop: 30,
    alignItems: "center",
    marginBottom: 40,
  },
});