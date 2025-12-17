import { useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import { AuthNavigator } from "./AuthNavigator";
import { OnboardingNavigator } from "./OnboardingNavigator";
import { AppTabsNavigator } from "./AppTabsNavigator";
import { RootStackParamList } from "./types";
import { theme } from "../theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    card: theme.colors.card,
    primary: theme.colors.primary,
    text: theme.colors.text,
    border: theme.colors.border,
    notification: theme.colors.primary
  }
};

export function RootNavigator() {
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const load = async () => {
      const flag = await AsyncStorage.getItem("onboardingComplete");
      setHasOnboarded(flag === "true");
    };
    void load();
  }, []);

  if (hasOnboarded === null) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasOnboarded ? (
          <Stack.Screen name="Onboarding">
            {() => <OnboardingNavigator onDone={() => setHasOnboarded(true)} />}
          </Stack.Screen>
        ) : !isAuthenticated ? (
          <Stack.Screen name="Auth">
            {() => <AuthNavigator onLogin={() => setIsAuthenticated(true)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="App" component={AppTabsNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
