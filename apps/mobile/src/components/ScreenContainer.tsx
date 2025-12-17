import { ReactNode } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

interface ScreenContainerProps {
  children: ReactNode;
  scrollable?: boolean;
}

export function ScreenContainer({ children, scrollable = true }: ScreenContainerProps) {
  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc"
  },
  content: {
    padding: 20,
    flexGrow: 1,
    flex: 1
  }
});
