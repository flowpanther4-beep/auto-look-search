import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";

interface ScreenProps {
  children: ReactNode;
  scrollable?: boolean;
}

export function Screen({ children, scrollable = true }: ScreenProps) {
  const content = scrollable ? (
    <ScrollView contentContainerStyle={{ padding: theme.spacing.lg, flexGrow: 1 }}>{children}</ScrollView>
  ) : (
    <View style={{ flex: 1, padding: theme.spacing.lg }}>{children}</View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style="dark" backgroundColor={theme.colors.background} />
      {content}
    </SafeAreaView>
  );
}
