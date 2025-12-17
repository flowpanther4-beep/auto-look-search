import { Image, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card } from "../../components/Card";
import { ResultCandidateCard } from "../../components/ResultCandidateCard";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { HistoryStackParamList } from "../../navigation/types";
import { theme } from "../../theme";

export function HistoryDetailScreen({ route }: NativeStackScreenProps<HistoryStackParamList, "HistoryDetail">) {
  const { item } = route.params;
  const response = item.response;

  if (!response.success) {
    return (
      <Screen>
        <AppHeader title="No se pudo cargar" subtitle={response.message ?? "Respuesta inválida"} />
      </Screen>
    );
  }

  const showQuestions = response.topCandidate.confidence < 0.8;

  return (
    <Screen>
      <AppHeader
        accent={item.status === "confirmed" ? "Confirmed" : "Not sure"}
        title={item.topCandidateName}
        subtitle={new Date(item.createdAt).toLocaleString()}
      />

      <Card>
        <Image source={{ uri: item.thumbnailUri }} style={{ width: "100%", height: 210, borderRadius: theme.radius.lg }} />
        <Text style={{ color: theme.colors.muted, marginTop: theme.spacing.sm }}>
          {response.vehicle.make} {response.vehicle.model} {response.vehicle.year}
        </Text>
      </Card>

      {response.candidates.map((candidate, index) => (
        <ResultCandidateCard
          key={candidate.id}
          candidate={candidate}
          index={index}
          showQuestions={showQuestions && index === 0}
          highlight={index === 0}
        />
      ))}
    </Screen>
  );
}
