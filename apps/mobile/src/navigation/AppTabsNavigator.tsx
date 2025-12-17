import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { HomeNavigator } from "./HomeNavigator";
import { HistoryNavigator } from "./HistoryNavigator";
import { AppTabParamList } from "./types";
import { ProScreen } from "../screens/pro/ProScreen";
import { theme } from "../theme";

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border },
        tabBarLabelStyle: { fontWeight: "700" }
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={HistoryNavigator}
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => <Feather name="clock" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Pro"
        component={ProScreen}
        options={{
          title: "Pro",
          tabBarIcon: ({ color, size }) => <Feather name="zap" size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}
