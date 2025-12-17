import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { saveHistoryItem } from "../../storage/history";
import { mockIdentifyPart } from "../../services/mockIdentifyPart";
import { HomeStackParamList } from "../../navigation/types";

export function AnalyzeScreen({ route, navigation }: NativeStackScreenProps<HomeStackParamList, "Analyze">) {
  const { photoUri, vehicle } = route.params;
  const [status, setStatus] = useState("Analizando foto...");

  useEffect(() => {
    const analyze = async () => {
      setStatus("Leyendo detalles del vehículo...");
      const response = await mockIdentifyPart(vehicle);
      setStatus("Generando resultados...");

      await saveHistoryItem({
        id: response.analysisId,
        createdAt: new Date().toISOString(),
        thumbnailUri: photoUri,
        vehicle,
        topCandidateName: response.topCandidate.commonName,
        response
      });

      navigation.replace("Result", { result: response, photoUri });
    };

    void analyze();
  }, [navigation, photoUri, vehicle]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0f172a" />
      <Text style={styles.text}>{status}</Text>
      <Text style={styles.subtext}>Usando mockIdentifyPart (1.5s)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
    padding: 20
  },
  text: {
    marginTop: 16,
    color: "#0f172a",
    fontWeight: "700",
    fontSize: 18
  },
  subtext: {
    color: "#475569",
    marginTop: 6
  }
});
