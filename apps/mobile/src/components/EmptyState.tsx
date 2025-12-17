import { Text, View } from "react-native";
import { theme } from "../theme";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
}

export function EmptyState({ title, description, icon = "🧭" }: EmptyStateProps) {
  return (
    <View style={{ alignItems: "center", marginTop: theme.spacing.xl, gap: 10 }}>
      <Text style={{ fontSize: 42 }}>{icon}</Text>
      <Text style={{ color: theme.colors.text, fontWeight: "800", fontSize: 18 }}>{title}</Text>
      <Text style={{ color: theme.colors.muted, textAlign: "center", paddingHorizontal: theme.spacing.lg }}>{description}</Text>
    </View>
  );
}
