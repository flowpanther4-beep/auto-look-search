import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
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

  const handleConfirm = async () => {
    setConfirmed(true);
    await updateHistoryStatus(result.analysisId, "confirmed");
    Alert.alert("Saved", "Marked as confirmed for your history.");
  };

  return (
    <Screen>
      <AppHeader
        accent={confirmed ? "Confirmed" : "Review"}
        title={confirmed ? "Locked in" : "Best match"}
        subtitle="Confidence-driven results with quick follow ups"
      />

      <Card>
        <Image source={{ uri: photoUri }} style={{ width: "100%", height: 210, borderRadius: theme.radius.lg, marginBottom: theme.spacing.md }} />
        <Text style={{ color: theme.colors.text, fontWeight: "800", fontSize: 20 }}>{result.topCandidate.commonName}</Text>
        <Text style={{ color: theme.colors.muted, marginTop: 4 }}>{result.topCandidate.technicalName}</Text>
        <ConfidenceBar value={result.topCandidate.confidence} />
        <View style={{ flexDirection: "row", marginTop: theme.spacing.md, gap: 8 }}>
          <PrimaryButton title="Confirm this part" onPress={handleConfirm} fullWidth={false} disabled={confirmed} />
          <SecondaryButton title="New analysis" onPress={() => navigation.popToTop()} fullWidth={false} />
        </View>
      </Card>

      <AppHeader title="Vehicle" subtitle={`${result.vehicle.make} ${result.vehicle.model} ${result.vehicle.year}`} />
      <View style={{ flexDirection: "row", gap: 10, marginBottom: theme.spacing.md }}>
        {result.vehicle.engine ? <SecondaryButton title={`Engine: ${result.vehicle.engine}`} onPress={() => undefined} fullWidth={false} disabled /> : null}
        {result.vehicle.partLocation ? <SecondaryButton title={`Location: ${result.vehicle.partLocation}`} onPress={() => undefined} fullWidth={false} disabled /> : null}
      </View>

      <AppHeader title="Other possible matches" subtitle="Confidence ordered" />
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
          <Text style={{ color: theme.colors.text, fontWeight: "800", marginBottom: 8 }}>Questions to confirm</Text>
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
