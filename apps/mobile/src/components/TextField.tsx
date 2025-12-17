import { ReactNode } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface TextFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  rightElement?: ReactNode;
}

export function TextField({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  rightElement
}: TextFieldProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {rightElement}
      </View>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#94a3b8"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  label: {
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 6
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#0f172a"
  },
  inputError: {
    borderColor: "#ef4444"
  },
  error: {
    color: "#ef4444",
    marginTop: 6
  }
});
