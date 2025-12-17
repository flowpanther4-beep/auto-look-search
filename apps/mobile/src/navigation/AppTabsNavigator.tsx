import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeNavigator } from "./HomeNavigator";
import { HistoryNavigator } from "./HistoryNavigator";
import { AppTabParamList } from "./types";
import { ProScreen } from "../screens/pro/ProScreen";
import { Text } from "react-native";

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0f172a",
        tabBarLabelStyle: { fontWeight: "700" }
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          title: "Home",
          tabBarIcon: () => <Text>🏠</Text>
        }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={HistoryNavigator}
        options={{
          title: "History",
          tabBarIcon: () => <Text>🕑</Text>
        }}
      />
      <Tab.Screen
        name="Pro"
        component={ProScreen}
        options={{
          title: "Pro",
          tabBarIcon: () => <Text>⚡️</Text>
        }}
      />
    </Tab.Navigator>
  );
}
