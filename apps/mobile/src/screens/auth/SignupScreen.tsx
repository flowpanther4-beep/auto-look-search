import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenContainer } from "../../components/ScreenContainer";

export function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!email || !password) {
      Alert.alert("Completa tus datos", "Email y password son requeridos");
      return;
    }
    Alert.alert("Cuenta creada", "Listo, inicia sesión con tu nuevo usuario");
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.subtitle}>Mock signup sin backend</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="you@example.com"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#94a3b8"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <PrimaryButton title="Registrar" onPress={handleSignup} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a"
  },
  subtitle: {
    color: "#475569",
    marginBottom: 24
  },
  form: {
    marginTop: 12
  },
  label: {
    color: "#0f172a",
    fontWeight: "600",
    marginBottom: 8
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#0f172a",
    marginBottom: 16
  }
});
