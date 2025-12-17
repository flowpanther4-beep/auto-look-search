import { ReactNode } from "react";
import { View } from "react-native";
import { theme } from "../theme";

interface CardProps {
  children: ReactNode;
  padded?: boolean;
}

export function Card({ children, padded = true }: CardProps) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: padded ? theme.spacing.md : 0,
        shadowColor: "#0f172a",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 10 },
        elevation: 3,
        marginBottom: theme.spacing.md
      }}
    >
      {children}
    </View>
  );
}
