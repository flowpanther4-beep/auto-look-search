import { Image, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card } from "../../components/Card";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ResultCandidateCard } from "../../components/ResultCandidateCard";
import { ScreenContainer } from "../../components/ScreenContainer";
import { HomeStackParamList } from "../../navigation/types";

export function ResultScreen({ route, navigation }: NativeStackScreenProps<HomeStackParamList, "Result">) {
  const { result, photoUri } = route.params;
  const showQuestions = result.topCandidate.confidence < 0.8;

  return (
    <ScreenContainer>
      <Text style={styles.title}>Resultado</Text>
      <Text style={styles.subtitle}>Top {result.candidates.length} candidatos</Text>

      <Card>
        <Text style={styles.sectionTitle}>Vehículo</Text>
        <Text style={styles.vehicle}>{result.vehicle.make} {result.vehicle.model} {result.vehicle.year}</Text>
        {result.vehicle.engine ? <Text style={styles.meta}>Motor: {result.vehicle.engine}</Text> : null}
        {result.vehicle.partLocation ? <Text style={styles.meta}>Ubicación: {result.vehicle.partLocation}</Text> : null}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Captura</Text>
        <Image source={{ uri: photoUri }} style={styles.image} />
      </Card>

      {result.candidates.map((candidate, index) => (
        <ResultCandidateCard key={candidate.id} candidate={candidate} index={index} showQuestions={showQuestions && index === 0} />
      ))}

      <PrimaryButton title="Nuevo análisis" onPress={() => navigation.popToTop()} />
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
