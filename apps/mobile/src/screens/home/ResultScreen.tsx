import { useMemo, useState } from "react";
import { Alert, Image, Linking, Pressable, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../navigation/types";
import { Card } from "../../components/Card";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { ResultCandidateCard } from "../../components/ResultCandidateCard";
import { ConfidenceBar } from "../../components/ConfidenceBar";
import { PrimaryButton, SecondaryButton } from "../../components/PrimaryButton";
import { updateHistoryStatus } from "../../storage/history";
import { theme } from "../../theme";

export function ResultScreen({ route, navigation }: NativeStackScreenProps<HomeStackParamList, "Result">) {
  const { result, photoUri } = route.params;
  const [confirmed, setConfirmed] = useState(result.topCandidate.confidence >= 0.8);
  const showQuestions = result.topCandidate.confidence < 0.8;

  const retailerButtons = useMemo(
    () => [
      { label: "Amazon", url: result.topCandidate.retailerLinks.amazon },
      { label: "eBay Motors", url: result.topCandidate.retailerLinks.ebay },
      { label: "AutoParts / RockAuto", url: result.topCandidate.retailerLinks.rockauto }
    ],
    [result.topCandidate.retailerLinks]
  );

  const compatibilityText = useMemo(
    () => `${result.vehicle.make} ${result.vehicle.model} ${result.vehicle.year}`.trim(),
    [result.vehicle.make, result.vehicle.model, result.vehicle.year]
  );

  const handleConfirm = async () => {
    setConfirmed(true);
    await updateHistoryStatus(result.analysisId, "confirmed");
    Alert.alert("Saved", "Marked as confirmed for your history.");
  };

  const openRetailer = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <Screen>
      <AppHeader
        accent={confirmed ? "Confirmado" : "Revisa y confirma"}
        title={confirmed ? "Resultado listo" : "Resultado más probable"}
        subtitle="Analizamos tu foto y te guiamos directo a la compra."
      />

      <Card>
        <Image source={{ uri: photoUri }} style={{ width: "100%", height: 220, borderRadius: theme.radius.lg, marginBottom: theme.spacing.md }} />
        <Text style={{ color: theme.colors.text, fontWeight: "800", fontSize: 22 }}>{result.topCandidate.commonName}</Text>
        <Text style={{ color: theme.colors.muted, marginTop: 4 }}>{result.topCandidate.technicalName}</Text>
        <ConfidenceBar value={result.topCandidate.confidence} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: theme.spacing.sm }}>
          <SecondaryButton title={compatibilityText} onPress={() => undefined} fullWidth={false} disabled />
          {result.vehicle.partLocation ? (
            <SecondaryButton title={`Ubicación: ${result.vehicle.partLocation}`} onPress={() => undefined} fullWidth={false} disabled />
          ) : null}
        </View>
        <View style={{ flexDirection: "row", marginTop: theme.spacing.md, gap: 8 }}>
          <PrimaryButton title={confirmed ? "Guardado" : "Confirmar parte"} onPress={handleConfirm} fullWidth={false} disabled={confirmed} />
          <SecondaryButton title="Nueva foto" onPress={() => navigation.popToTop()} fullWidth={false} />
        </View>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: "800", fontSize: 18, marginBottom: 6 }}>Compatibilidad estimada</Text>
        <Text style={{ color: theme.colors.muted }}>
          Coincide con {compatibilityText}. Ajustamos la búsqueda usando tu foto y las equivalencias OEM/aftermarket más comunes.
        </Text>
        <View style={{ flexDirection: "row", gap: 8, marginTop: theme.spacing.md, flexWrap: "wrap" }}>
          {result.vehicle.engine ? (
            <SecondaryButton title={`Motor: ${result.vehicle.engine}`} onPress={() => undefined} fullWidth={false} disabled />
          ) : null}
          {result.topCandidate.priceRange ? (
            <SecondaryButton title={`Precio ref: ${result.topCandidate.priceRange}`} onPress={() => undefined} fullWidth={false} disabled />
          ) : null}
        </View>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: "800", fontSize: 18, marginBottom: 8 }}>Síntomas clave</Text>
        {result.topCandidate.symptoms.map((symptom) => (
          <Text key={symptom} style={{ color: theme.colors.muted, marginBottom: 4 }}>
            • {symptom}
          </Text>
        ))}
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: "800", fontSize: 18, marginBottom: 10 }}>Compra al instante</Text>
        <Text style={{ color: theme.colors.muted, marginBottom: theme.spacing.md }}>
          Usamos la descripción detectada para preparar búsquedas en los principales marketplaces.
        </Text>
        <View style={{ gap: 10 }}>
          {retailerButtons.map((retailer) => (
            <Pressable
              key={retailer.label}
              onPress={() => void openRetailer(retailer.url)}
              style={({ pressed }) => ({
                backgroundColor: pressed ? "rgba(15,37,110,0.08)" : theme.colors.card,
                borderWidth: 1,
                borderColor: theme.colors.border,
                padding: theme.spacing.md,
                borderRadius: theme.radius.lg,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                shadowColor: "#0f256e",
                shadowOpacity: pressed ? 0.12 : 0.06,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 8 },
                elevation: 2
              })}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    backgroundColor: "rgba(15,37,110,0.08)",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Feather name="shopping-bag" size={18} color={theme.colors.primary} />
                </View>
                <Text style={{ color: theme.colors.text, fontWeight: "800", fontSize: 16 }}>{retailer.label}</Text>
              </View>
              <Text style={{ color: theme.colors.muted, fontWeight: "700" }}>Abrir búsqueda</Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <AppHeader title="Otras coincidencias" subtitle="Ordenadas por confianza" />
      {result.candidates.map((candidate, index) => (
        <ResultCandidateCard
          key={candidate.id}
          candidate={candidate}
          index={index}
          highlight={index === 0}
          showQuestions={showQuestions && index === 0}
          onConfirm={index === 0 ? handleConfirm : undefined}
        />
      ))}

      {showQuestions && result.topCandidate.questions && result.topCandidate.questions.length ? (
        <Card>
          <Text style={{ color: theme.colors.text, fontWeight: "800", marginBottom: 8 }}>Confirma con estas preguntas</Text>
          {result.topCandidate.questions.map((q) => (
            <Text key={q} style={{ color: theme.colors.muted, marginBottom: 4 }}>
              • {q}
            </Text>
          ))}
        </Card>
      ) : null}
    </Screen>
  );
}
