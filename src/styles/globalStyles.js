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
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    color: "#FFCAD4",
  },
  subtitulo: {
    fontSize: 25,
    marginTop: 15,
    marginBottom: 5,
    color: "#FF407D",
    fontWeight: "bold",
  },
  text: {
    color: "#FF407D",
    fontSize: 20,
  },
  textClaro: {
    color: "#FEF3E2",
    fontSize: 20,
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
  lista: {
    fontSize: 20,
    marginLeft: 10,
    lineHeight: 22,
    color: "#FFE3CA", 
    fontWeight: "bold",
  },
  link: {
    color: "#FFCAD4",
    textAlign: "center",
    marginTop: 20,
    fontSize: 17,
  },
  //input
  input: {
    height: 60,
    borderColor: "#FFE3CA",
    backgroundColor: "#FFE3CA",
    borderWidth: 1,
    borderRadius: 8,
    color: "#FF407D",
    marginBottom: 20,
    padding: 10,
fontSize: 20,
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
    margin: 5,
  },
  textoBotaoClaro: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    margin: 5,
  },
  addButton: {
    backgroundColor: "#FF407D",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
      fontSize: 18,
      marginVertical: 5,
    },
    modalDetail: {
      fontSize: 20,
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
      fontSize: 20,
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
    fontSize: 20,
    color: "#FF407D",
  },
  // estilo dos cards:
  card: {
    backgroundColor: '#FFE3CA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 10,
  },
});
