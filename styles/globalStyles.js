import { StyleSheet, Platform} from "react-native";

export const globalStyles = StyleSheet.create({
  //Container de tela
  screenContainer: {
    flex: 1,
    backgroundColor: "#40679E",
    justifyContent: "center",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, 
    backgroundColor: "#40679E",
  },
  // Textos
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    color: "#FFCAD4",
  },
  subtitulo: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    color: "#FF407D",
    fontWeight: "bold",
  },
  text: {
    color: "#FF407D",
    fontSize: 14,
  },
  textClaro: {
    color: "#FEF3E2",
  },
  textoContainer: {
    minHeight: 50,
    borderColor: "#ddd",
    borderWidth: 3,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#FFE3CA",
  },
  //input
  input: {
    height: 50,
    borderColor: "#FFE3CA",
    backgroundColor: "#FFE3CA",
    borderWidth: 1,
    borderRadius: 8,
    color: "#FF407D",
    marginBottom: 20,
    padding: 10,
  },
  // botao
  botao: {
    backgroundColor: "#FF407D",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botaoContainer: {
    marginTop: 30,
    alignItems: "center",
    marginBottom: 40,
  },
  textoBotao: {
    color: "#FF407D",
    fontWeight: "bold",
    fontSize: 20,
  },
  textoBotaoClaro: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  //erro
  erro: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  // tempo
  tempoBotao: {
    height: 60,
    backgroundColor: "#FFE3CA",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  legenda: {
    fontSize: 12,
    color: "#EB5B00",
    marginTop: 4,
  },
    //   Area dedicada ao estilo do Modal de confirmaçao
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: "#FEF3E2",
      borderRadius: 10,
      padding: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#FF407D",
      textAlign: "center",
    },
    modalText: {
      fontSize: 16,
      marginVertical: 5,
    },
    modalDetail: {
      fontSize: 14,
      color: "#555",
      marginLeft: 10,
      marginBottom: 5,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    modalButton: {
      flex: 1,
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      marginHorizontal: 5,
    },
    cancelButton: {
      backgroundColor: "#ccc",
    },
    confirmButton: {
      backgroundColor: "#FF407D",
    },
    modalButtonText: {
      color: "white",
      fontWeight: "bold",
    },
      //  Area picker refere-se ao estilo de seleçao
  pickerContainer: {
    marginBottom: 15,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#FFE3CA",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#FFE3CA",
    height: Platform.OS === "ios" ? 120 : 50,
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    color: "#FF407D",
  },
  pickerItem: {
    fontSize: 16,
    color: "#FF407D",
  },
});
