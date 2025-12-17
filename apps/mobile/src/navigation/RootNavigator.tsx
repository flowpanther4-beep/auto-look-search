import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import { AuthNavigator } from "./AuthNavigator";
import { OnboardingNavigator } from "./OnboardingNavigator";
import { AppTabsNavigator } from "./AppTabsNavigator";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc" }}>
        <ActivityIndicator size="large" color="#0f172a" />
      </View>
    );
  }

  return (
    <NavigationContainer>
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
