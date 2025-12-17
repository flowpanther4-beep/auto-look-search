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
            backgroundColor: "rgba(15, 23, 42, 0.06)",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: theme.radius.md
          }}
        >
          <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>{accent}</Text>
        </View>
      ) : null}
      <Text style={{ fontSize: 26, fontWeight: "800", color: theme.colors.text }}>{title}</Text>
      {subtitle ? <Text style={{ color: theme.colors.muted, fontSize: 16 }}>{subtitle}</Text> : null}
    </View>
  );
}
