import { View, Text } from "react-native";
import { theme } from "../theme";

interface ConfidenceBarProps {
  value: number;
}

export function ConfidenceBar({ value }: ConfidenceBarProps) {
  const percentage = Math.round(value * 100);
  const color = value >= 0.8 ? theme.colors.success : value >= 0.6 ? theme.colors.warning : "#f43f5e";

  return (
    <View style={{ marginTop: 8 }}>
      <View
        style={{
          backgroundColor: "#e2e8f0",
          height: 10,
          borderRadius: theme.radius.md,
          overflow: "hidden"
        }}
      >
        <View style={{ width: `${percentage}%`, height: "100%", backgroundColor: color, borderRadius: theme.radius.md }} />
      </View>
      <Text style={{ color: color, fontWeight: "700", marginTop: 6 }}>{percentage}% confidence</Text>
    </View>
  );
}
