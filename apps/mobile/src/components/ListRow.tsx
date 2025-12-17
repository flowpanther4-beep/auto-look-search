import { Image, Pressable, Text, View } from "react-native";
import { theme } from "../theme";

interface ListRowProps {
  title: string;
  subtitle: string;
  meta: string;
  status?: "confirmed" | "not_sure";
  thumbnail?: string;
  onPress?: () => void;
  confidence?: number;
}

export function ListRow({ title, subtitle, meta, onPress, thumbnail, status = "not_sure", confidence }: ListRowProps) {
  const badgeColor = status === "confirmed" ? theme.colors.success : theme.colors.warning;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        opacity: pressed ? 0.95 : 1,
        alignItems: "center",
        marginBottom: theme.spacing.sm,
        shadowColor: "#0f172a",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 6 },
        elevation: 2
      })}
    >
      {thumbnail ? <Image source={{ uri: thumbnail }} style={{ width: 64, height: 64, borderRadius: theme.radius.md, marginRight: 12 }} /> : null}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={{ color: theme.colors.text, fontWeight: "800", fontSize: 16, flexShrink: 1 }}>{title}</Text>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 4,
              backgroundColor: `${badgeColor}22`,
              borderRadius: theme.radius.md
            }}
          >
            <Text style={{ color: badgeColor, fontWeight: "700" }}>{status === "confirmed" ? "Confirmed" : "Not sure"}</Text>
          </View>
        </View>
        <Text style={{ color: theme.colors.muted, marginTop: 4 }}>{subtitle}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <Text style={{ color: theme.colors.muted }}>{meta}</Text>
          {typeof confidence === "number" ? (
            <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{Math.round(confidence * 100)}%</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
