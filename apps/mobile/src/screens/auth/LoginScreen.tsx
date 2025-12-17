import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { AuthStackParamList } from "../../navigation/types";

interface LoginScreenProps extends NativeStackScreenProps<AuthStackParamList, "Login"> {
  onLogin: () => void;
}

export function LoginScreen({ navigation, onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Completa tus datos", "Email y password son requeridos");
      return;
    }
    onLogin();
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Bienvenido de vuelta</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

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

        <PrimaryButton title="Login" onPress={handleLogin} />
        <PrimaryButton
          title="Crear cuenta"
          variant="secondary"
          onPress={() => navigation.navigate("Signup")}
        />
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
