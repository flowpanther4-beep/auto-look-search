import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingScreen } from "../screens/onboarding/OnboardingScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<Pick<RootStackParamList, "Onboarding">>();

interface OnboardingNavigatorProps {
  onDone: () => void;
}

export function OnboardingNavigator({ onDone }: OnboardingNavigatorProps) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding">
        {() => <OnboardingScreen onDone={onDone} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
