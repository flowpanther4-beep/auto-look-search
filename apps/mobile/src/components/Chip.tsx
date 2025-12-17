import { Pressable, Text } from "react-native";
import { theme } from "../theme";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
}

export function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.radius.lg,
        backgroundColor: selected ? "rgba(15,23,42,0.08)" : theme.colors.card,
        borderWidth: 1,
        borderColor: selected ? theme.colors.primary : theme.colors.border,
        opacity: pressed ? 0.9 : 1
      })}
    >
      <Text style={{ color: selected ? theme.colors.primary : theme.colors.text, fontWeight: "700" }}>{label}</Text>
    </Pressable>
  );
}
