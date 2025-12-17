import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { IdentifyPartResponseSchema } from "@autopartsnap/shared";

type Screen = "home" | "capture" | "upload";

type ActionCardProps = {
  title: string;
  description: string;
  onPress: () => void;
};

function ActionCard({ title, description, onPress }: ActionCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  // Validate shared schema availability in the mobile workspace.
  useMemo(() => IdentifyPartResponseSchema.safeParse({ success: true }), []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>AutoPartSnap</Text>
      {screen === "home" ? (
        <View style={styles.grid}>
          <ActionCard
            title="Tomar foto"
            description="Inicia el flujo de cámara para identificar la pieza."
            onPress={() => setScreen("capture")}
          />
          <ActionCard
            title="Subir foto"
            description="Cargar una imagen existente para analizar."
            onPress={() => setScreen("upload")}
          />
        </View>
      ) : (
        <View style={styles.detail}>
          <Text style={styles.cardTitle}>
            {screen === "capture" ? "Tomar foto" : "Subir foto"}
          </Text>
          <Text style={styles.cardDescription}>
            Navegación básica lista. El flujo detallado se conectará pronto.
          </Text>
          <TouchableOpacity style={styles.backButton} onPress={() => setScreen("home")}>
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    color: "#0f172a"
  },
  grid: {
    width: "100%"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111827"
  },
  cardDescription: {
    fontSize: 14,
    color: "#475569"
  },
  detail: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center"
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "600"
  }
});
