import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AnalyzeScreen } from "../screens/home/AnalyzeScreen";
import { HomeScreen } from "../screens/home/HomeScreen";
import { ResultScreen } from "../screens/home/ResultScreen";
import { VehicleInfoScreen } from "../screens/home/VehicleInfoScreen";
import { HomeStackParamList } from "./types";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Inicio" }} />
      <Stack.Screen name="VehicleInfo" component={VehicleInfoScreen} options={{ title: "Vehículo" }} />
      <Stack.Screen name="Analyze" component={AnalyzeScreen} options={{ title: "Analizando" }} />
      <Stack.Screen name="Result" component={ResultScreen} options={{ title: "Resultado" }} />
    </Stack.Navigator>
  );
}
