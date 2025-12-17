import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { ReactNode } from "react";
import { theme } from "../theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function PrimaryButton({ title, onPress, loading, disabled, icon, fullWidth = true }: ButtonProps) {
  const background = theme.colors.primary;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => ({
        width: fullWidth ? "100%" : undefined,
        opacity: disabled || loading ? 0.6 : pressed ? 0.9 : 1,
        backgroundColor: background,
        paddingVertical: theme.spacing.sm + 2,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.radius.lg,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: fullWidth ? "stretch" : "flex-start",
        shadowColor: "#0f172a",
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
        elevation: 4
      })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>{title}</Text>
        {loading ? <ActivityIndicator color="#fff" style={{ marginLeft: 8 }} /> : null}
      </View>
    </Pressable>
  );
}

export function SecondaryButton({ title, onPress, loading, disabled, icon, fullWidth = true }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => ({
        width: fullWidth ? "100%" : undefined,
        opacity: disabled || loading ? 0.6 : pressed ? 0.9 : 1,
        backgroundColor: theme.colors.card,
        paddingVertical: theme.spacing.sm + 2,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: fullWidth ? "stretch" : "flex-start"
      })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}
        <Text style={{ color: theme.colors.text, fontWeight: "700", fontSize: 16 }}>{title}</Text>
        {loading ? <ActivityIndicator color={theme.colors.text} style={{ marginLeft: 8 }} /> : null}
      </View>
    </Pressable>
  );
}
