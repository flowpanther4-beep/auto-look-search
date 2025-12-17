import { Image, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card } from "../../components/Card";
import { ResultCandidateCard } from "../../components/ResultCandidateCard";
import { ScreenContainer } from "../../components/ScreenContainer";
import { HistoryStackParamList } from "../../navigation/types";

export function HistoryDetailScreen({ route }: NativeStackScreenProps<HistoryStackParamList, "HistoryDetail">) {
  const { item } = route.params;
  const response = item.response;

  if (!response.success) {
    return (
      <ScreenContainer>
        <Text style={styles.title}>No se pudo cargar</Text>
        <Text style={styles.subtitle}>{response.message ?? "Respuesta inválida"}</Text>
      </ScreenContainer>
    );
  }

  const showQuestions = response.topCandidate.confidence < 0.8;

  return (
    <ScreenContainer>
      <Text style={styles.title}>{item.topCandidateName}</Text>
      <Text style={styles.subtitle}>{new Date(item.createdAt).toLocaleString()}</Text>

      <Card>
        <Text style={styles.sectionTitle}>Vehículo</Text>
        <Text style={styles.vehicle}>{response.vehicle.make} {response.vehicle.model} {response.vehicle.year}</Text>
        {response.vehicle.engine ? <Text style={styles.meta}>Motor: {response.vehicle.engine}</Text> : null}
        {response.vehicle.partLocation ? <Text style={styles.meta}>Ubicación: {response.vehicle.partLocation}</Text> : null}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Captura</Text>
        <Image source={{ uri: item.thumbnailUri }} style={styles.image} />
      </Card>

      {response.candidates.map((candidate, index) => (
        <ResultCandidateCard key={candidate.id} candidate={candidate} index={index} showQuestions={showQuestions && index === 0} />
      ))}
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
    marginBottom: 16
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8
  },
  vehicle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a"
  },
  meta: {
    color: "#475569",
    marginTop: 4
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16
  }
});
