import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { IdentifyPartSuccessResponse } from "../navigation/types";

interface Props {
  candidate: IdentifyPartSuccessResponse["topCandidate"];
  index: number;
  showQuestions?: boolean;
}

const retailerLabels: Record<keyof Props["candidate"]["retailerLinks"], string> = {
  amazon: "Amazon",
  ebay: "eBay",
  rockauto: "RockAuto"
};

export function ResultCandidateCard({ candidate, index, showQuestions }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.rank}>#{index + 1}</Text>
        <Text style={styles.confidence}>{Math.round(candidate.confidence * 100)}%</Text>
      </View>
      <Text style={styles.title}>{candidate.commonName}</Text>
      <Text style={styles.subtitle}>{candidate.technicalName}</Text>

      <View style={styles.section}> 
        <Text style={styles.sectionTitle}>Síntomas</Text>
        {candidate.symptoms.map((symptom) => (
          <Text key={symptom} style={styles.listItem}>
            • {symptom}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>OEM</Text>
        <Text style={styles.meta}>{candidate.oemPartNumbers.join(", ")}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aftermarket</Text>
        <Text style={styles.meta}>{candidate.aftermarketEquivalents.join(", ")}</Text>
      </View>

      <Text style={styles.price}>{candidate.priceRange}</Text>

      <View style={styles.linksRow}>
        {Object.entries(candidate.retailerLinks).map(([key, url]) => (
          <Pressable key={key} style={styles.linkButton} onPress={() => Linking.openURL(url)}>
            <Text style={styles.linkText}>{retailerLabels[key as keyof typeof retailerLabels]}</Text>
          </Pressable>
        ))}
      </View>

      {showQuestions && candidate.questions && candidate.questions.length > 0 ? (
        <View style={[styles.section, styles.questionSection]}>
          <Text style={styles.sectionTitle}>Preguntas para confirmar</Text>
          {candidate.questions.map((question) => (
            <Text key={question} style={styles.listItem}>
              • {question}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rank: {
    fontWeight: "800",
    color: "#0f172a"
  },
  confidence: {
    backgroundColor: "#ecfeff",
    color: "#0ea5e9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "700"
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
    color: "#0f172a"
  },
  subtitle: {
    color: "#475569",
    marginBottom: 8
  },
  section: {
    marginTop: 8
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4
  },
  listItem: {
    color: "#475569",
    marginBottom: 2
  },
  meta: {
    color: "#0f172a"
  },
  price: {
    fontWeight: "700",
    color: "#0ea5e9",
    marginTop: 8,
    fontSize: 16
  },
  linksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12
  },
  linkButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#0f172a",
    borderRadius: 12
  },
  linkText: {
    color: "#fff",
    fontWeight: "700"
  },
  questionSection: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 12,
    marginTop: 14
  }
});
