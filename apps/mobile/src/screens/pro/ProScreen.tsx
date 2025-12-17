import { Alert, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Screen } from "../../components/Screen";
import { PrimaryButton, SecondaryButton } from "../../components/PrimaryButton";
import { AppHeader } from "../../components/AppHeader";
import { Card } from "../../components/Card";
import { theme } from "../../theme";

const plans = [
  { label: "Mensual", price: "$9.99", note: "Cancela cuando quieras" },
  { label: "Anual", price: "$79.99", note: "2 meses de regalo", featured: true }
];

const benefits = [
  "Análisis ilimitados con IA",
  "Compatibilidad avanzada por modelo",
  "Exportar lista de partes",
  "Soporte prioritario"
];

export function ProScreen() {
  return (
    <Screen>
      <AppHeader
        accent="Pro"
        title="Desbloquea AutoPartSnap Pro"
        subtitle="Más precisión, más compatibilidad y atajos directos a la compra."
      />

      <Card>
        <View style={{ gap: theme.spacing.md }}>
          {plans.map((plan) => (
            <View
              key={plan.label}
              style={{
                borderWidth: 1,
                borderColor: plan.featured ? theme.colors.primary : theme.colors.border,
                padding: theme.spacing.md,
                borderRadius: theme.radius.lg,
                backgroundColor: plan.featured ? "rgba(15,37,110,0.06)" : theme.colors.card
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={{ color: theme.colors.text, fontWeight: "800", fontSize: 18 }}>{plan.label}</Text>
                  <Text style={{ color: theme.colors.muted }}>{plan.price}</Text>
                  <Text style={{ color: theme.colors.primary, marginTop: 4 }}>{plan.note}</Text>
                </View>
                <PrimaryButton title="Elegir" onPress={() => Alert.alert("Pro", `Flujo de compra ${plan.label} próximamente`)} fullWidth={false} />
              </View>
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: "800", fontSize: 18, marginBottom: theme.spacing.sm }}>
          Beneficios Pro
        </Text>
        <View style={{ gap: 10 }}>
          {benefits.map((benefit) => (
            <View key={benefit} style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Feather name="check" size={18} color={theme.colors.primary} />
              <Text style={{ color: theme.colors.text }}>{benefit}</Text>
            </View>
          ))}
        </View>
        <View style={{ marginTop: theme.spacing.lg, gap: 10 }}>
          <PrimaryButton title="Ir a Pro" onPress={() => Alert.alert("Pro", "El flujo de pago aún no está habilitado.")} />
          <SecondaryButton title="Restaurar compras" onPress={() => Alert.alert("Restaurar", "Intentaremos restaurar tus compras.")} />
        </View>
      </Card>
    </Screen>
  );
}
