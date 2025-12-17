import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AnalyzeScreen } from "../screens/home/AnalyzeScreen";
import { HomeScreen } from "../screens/home/HomeScreen";
import { ResultScreen } from "../screens/home/ResultScreen";
import { VehicleInfoScreen } from "../screens/home/VehicleInfoScreen";
import { HomeStackParamList } from "./types";
import { theme } from "../theme";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: { color: theme.colors.text, fontWeight: "800" },
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme.colors.background },
        contentStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
      <Stack.Screen name="VehicleInfo" component={VehicleInfoScreen} options={{ title: "Vehicle info" }} />
      <Stack.Screen name="Analyze" component={AnalyzeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Result" component={ResultScreen} options={{ title: "Result" }} />
    </Stack.Navigator>
  );
}
