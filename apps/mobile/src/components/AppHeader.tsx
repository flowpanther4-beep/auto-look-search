import { View, Text } from "react-native";
import { theme } from "../theme";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
}

export function AppHeader({ title, subtitle, accent }: AppHeaderProps) {
  return (
    <View style={{ gap: 6, marginBottom: theme.spacing.lg }}>
      {accent ? (
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: "rgba(29, 78, 216, 0.08)",
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: "rgba(29, 78, 216, 0.2)"
          }}
        >
          <Text style={{ color: theme.colors.primary, fontWeight: "700", letterSpacing: 0.2 }}>{accent}</Text>
        </View>
      ) : null}
      <Text style={{ fontSize: 26, fontWeight: "800", color: theme.colors.text }}>{title}</Text>
      {subtitle ? <Text style={{ color: theme.colors.muted, fontSize: 16 }}>{subtitle}</Text> : null}
    </View>
  );
}
