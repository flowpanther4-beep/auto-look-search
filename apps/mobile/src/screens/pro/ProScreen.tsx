import { Alert, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { PrimaryButton } from "../../components/PrimaryButton";

const benefits = [
  "Análisis ilimitados",
  "Compatibilidad avanzada por VIN",
  "Exportar lista de partes"
];

export function ProScreen() {
  return (
    <ScreenContainer>
      <View style={styles.hero}> 
        <Text style={styles.badge}>PRO</Text>
        <Text style={styles.title}>Desbloquea todo</Text>
        <Text style={styles.subtitle}>Accede a beneficios premium y soporte prioritario.</Text>
      </View>

      <View style={styles.card}>
        {benefits.map((item) => (
          <View key={item} style={styles.benefitRow}>
            <Text style={styles.check}>✓</Text>
            <Text style={styles.benefit}>{item}</Text>
          </View>
        ))}

        <PrimaryButton title="Mensual" onPress={() => Alert.alert("Coming soon", "Suscripción mensual pronto disponible")} />
        <PrimaryButton
          title="Anual"
          onPress={() => Alert.alert("Coming soon", "Suscripción anual pronto disponible")}
          variant="secondary"
        />
        <PrimaryButton
          title="Restore purchases"
          onPress={() => Alert.alert("Restore", "Intentaremos restaurar tus compras")}
          variant="secondary"
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#0f172a",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16
  },
  badge: {
    color: "#fde68a",
    fontWeight: "800",
    marginBottom: 8
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff"
  },
  subtitle: {
    color: "#cbd5e1",
    marginTop: 8
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  check: {
    color: "#22c55e",
    fontWeight: "800",
    marginRight: 8
  },
  benefit: {
    color: "#0f172a",
    fontWeight: "600"
  }
});
