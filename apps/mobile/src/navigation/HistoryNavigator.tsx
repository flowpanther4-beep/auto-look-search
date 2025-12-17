import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HistoryDetailScreen } from "../screens/history/HistoryDetailScreen";
import { HistoryScreen } from "../screens/history/HistoryScreen";
import { HistoryStackParamList } from "./types";
import { theme } from "../theme";

const Stack = createNativeStackNavigator<HistoryStackParamList>();

export function HistoryNavigator() {
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
      <Stack.Screen name="History" component={HistoryScreen} options={{ title: "History" }} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} options={{ title: "Details" }} />
    </Stack.Navigator>
  );
}
