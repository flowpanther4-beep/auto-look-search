import { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
}

export function PrimaryButton({
  title,
  onPress,
  disabled,
  loading,
  variant = "primary",
  icon
}: PrimaryButtonProps) {
  const isPrimary = variant === "primary";
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled
      ]}
    >
      <View style={styles.content}> 
        {icon}
        <Text style={[styles.text, !isPrimary && styles.secondaryText]}>{title}</Text>
        {loading && <ActivityIndicator color={isPrimary ? "#fff" : "#0f172a"} style={styles.spinner} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  primary: {
    backgroundColor: "#0f172a"
  },
  secondary: {
    backgroundColor: "#e2e8f0",
    borderWidth: 1,
    borderColor: "#cbd5e1"
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16
  },
  secondaryText: {
    color: "#0f172a"
  },
  pressed: {
    opacity: 0.9
  },
  disabled: {
    opacity: 0.6
  },
  spinner: {
    marginLeft: 8
  }
});
