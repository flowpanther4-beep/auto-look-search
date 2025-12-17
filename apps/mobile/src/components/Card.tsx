import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface CardProps {
  children: ReactNode;
  padded?: boolean;
}

export function Card({ children, padded = true }: CardProps) {
  return <View style={[styles.card, padded && styles.padded]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    marginBottom: 16
  },
  padded: {
    padding: 16
  }
});
