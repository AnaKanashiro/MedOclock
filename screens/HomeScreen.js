import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function App() {
  return (
    <View style={globalStyles.screenContainer}>
      <text>TELA HOME</text>
      <StatusBar style="auto" />
    </View>
  );
}
