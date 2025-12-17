import { Alert, Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { PrimaryButton, SecondaryButton } from "../../components/PrimaryButton";
import { AppHeader } from "../../components/AppHeader";
import { Card } from "../../components/Card";
import { theme } from "../../theme";
import { Feather } from "@expo/vector-icons";

const plans = [
  { label: "Monthly", price: "$9.99", benefits: ["Unlimited analyses", "VIN-grade matching"] },
  { label: "Annual", price: "$79.99", benefits: ["2 months free", "Priority support"] }
];

const bullets = [
  { icon: "zap", text: "Live confidence tuning" },
  { icon: "shield", text: "OEM + aftermarket pairs" },
  { icon: "clock", text: "History re-analysis" }
];

export function ProScreen() {
  return (
    <Screen>
      <AppHeader accent="Pro" title="Upgrade for power users" subtitle="Sharper matches, marketplace perks, and VIN smarts." />

      <View style={{ gap: theme.spacing.md }}>
        {plans.map((plan) => (
          <Card key={plan.label}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={{ color: theme.colors.text, fontWeight: "800", fontSize: 18 }}>{plan.label}</Text>
                <Text style={{ color: theme.colors.muted }}>{plan.price}</Text>
              </View>
              <PrimaryButton title="Go Pro" onPress={() => Alert.alert("Go Pro", `${plan.label} purchase flow coming soon`)} fullWidth={false} />
            </View>
            <View style={{ marginTop: theme.spacing.sm, gap: 6 }}>
              {plan.benefits.map((benefit) => (
                <View key={benefit} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Feather name="check" size={16} color={theme.colors.primary} />
                  <Text style={{ color: theme.colors.text }}>{benefit}</Text>
                </View>
              ))}
            </View>
          </Card>
        ))}
      </View>

      <Card>
        <View style={{ gap: 10 }}>
          {bullets.map((bullet) => (
            <View key={bullet.text} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Feather name={bullet.icon as any} size={16} color={theme.colors.primary} />
              <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{bullet.text}</Text>
            </View>
          ))}
        </View>
        <View style={{ marginTop: theme.spacing.md, gap: 10 }}>
          <PrimaryButton title="Go Pro" onPress={() => Alert.alert("Go Pro", "Checkout coming soon") } />
          <SecondaryButton title="Restore purchases" onPress={() => Alert.alert("Restore", "Intentaremos restaurar tus compras") } />
        </View>
      </Card>
    </Screen>
  );
}
