import { useState } from "react";
import { Alert, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PrimaryButton, SecondaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { AuthStackParamList } from "../../navigation/types";
import { AppHeader } from "../../components/AppHeader";
import { TextField } from "../../components/TextField";
import { theme } from "../../theme";

interface SignupScreenProps extends NativeStackScreenProps<AuthStackParamList, "Signup"> {
  onLogin: () => void;
}

export function SignupScreen({ navigation, onLogin }: SignupScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!email || !password) {
      Alert.alert("Completa tus datos", "Email y password son requeridos");
      return;
    }
    onLogin();
  };

  return (
    <Screen>
      <AppHeader accent="Create account" title="Join AutoPartSnap" subtitle="Sync history and unlock smarter analysis." />

      <View style={{ gap: theme.spacing.sm }}>
        <TextField label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextField label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />
      </View>

      <View style={{ marginTop: theme.spacing.lg, gap: 10 }}>
        <PrimaryButton title="Create account" onPress={handleSignup} />
        <SecondaryButton title="Already have an account" onPress={() => navigation.navigate("Login")} />
      </View>
    </Screen>
  );
}
