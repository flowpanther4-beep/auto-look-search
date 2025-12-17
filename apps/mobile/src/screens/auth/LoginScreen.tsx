import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PrimaryButton, SecondaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { AuthStackParamList } from "../../navigation/types";
import { AppHeader } from "../../components/AppHeader";
import { TextField } from "../../components/TextField";
import { theme } from "../../theme";

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
    <Screen>
      <AppHeader accent="Welcome back" title="Sign in" subtitle="Access your saved analyses and Pro perks." />

      <View style={{ gap: theme.spacing.sm }}>
        <TextField label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextField label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />
      </View>

      <View style={{ marginTop: theme.spacing.lg, gap: 10 }}>
        <PrimaryButton title="Sign in" onPress={handleLogin} />
        <SecondaryButton title="Create account" onPress={() => navigation.navigate("Signup")} />
      </View>
    </Screen>
  );
}
