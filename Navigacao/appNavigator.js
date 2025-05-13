import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import LogInScreen from "../screens/LogInScreen";
import CadastroScreen from "../screens/CadastroScreen";
import Header from "../componentes/Header";
import TermosDeUsoScreen from "../screens/TermosDeUsoScreen";
import CadastrarRemedioScreen from "../screens/CadastrarRemedioScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator 
        initialRouteName="LogIn"
        screenOptions={{
          headerShown: false 
        }}
      >
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="TermosDeUso" component={TermosDeUsoScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CadastrarRemedio" component={CadastrarRemedioScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}