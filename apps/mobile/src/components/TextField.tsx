import { TextInput, Text, View } from "react-native";
import { theme } from "../theme";

interface TextFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  helper?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address";
}

export function TextField({
  label,
  placeholder,
  value,
  onChangeText,
  helper,
  error,
  secureTextEntry,
  keyboardType = "default"
}: TextFieldProps) {
  const borderColor = error ? "#f43f5e" : theme.colors.border;

  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      <Text style={{ color: theme.colors.text, fontWeight: "600", marginBottom: 6 }}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={{
          backgroundColor: theme.colors.card,
          borderColor,
          borderWidth: 1,
          borderRadius: theme.radius.lg,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          color: theme.colors.text,
          fontSize: 16
        }}
      />
      {helper && !error ? <Text style={{ color: theme.colors.muted, marginTop: 6 }}>{helper}</Text> : null}
      {error ? <Text style={{ color: "#f43f5e", marginTop: 6, fontWeight: "600" }}>{error}</Text> : null}
    </View>
  );
}
