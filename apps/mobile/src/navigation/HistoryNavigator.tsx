import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HistoryDetailScreen } from "../screens/history/HistoryDetailScreen";
import { HistoryScreen } from "../screens/history/HistoryScreen";
import { HistoryStackParamList } from "./types";

const Stack = createNativeStackNavigator<HistoryStackParamList>();

export function HistoryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="History" component={HistoryScreen} options={{ title: "Historial" }} />
      <Stack.Screen
        name="HistoryDetail"
        component={HistoryDetailScreen}
        options={{ title: "Detalle" }}
      />
    </Stack.Navigator>
  );
}
