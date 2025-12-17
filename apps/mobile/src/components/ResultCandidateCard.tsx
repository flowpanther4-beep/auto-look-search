import { Linking, Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { IdentifyPartSuccessResponse } from "../navigation/types";
import { theme } from "../theme";
import { ConfidenceBar } from "./ConfidenceBar";
import { Card } from "./Card";

interface Props {
  candidate: IdentifyPartSuccessResponse["topCandidate"];
  index: number;
  showQuestions?: boolean;
  highlight?: boolean;
  onConfirm?: () => void;
}

const retailerLabels: Record<keyof Props["candidate"]["retailerLinks"], string> = {
  amazon: "Amazon",
  ebay: "eBay",
  rockauto: "RockAuto"
};

export function ResultCandidateCard({ candidate, index, showQuestions, highlight, onConfirm }: Props) {
  const borderColor = highlight ? theme.colors.primary : theme.colors.border;

  return (
    <Card>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={{ color: theme.colors.muted, fontWeight: "700" }}>#{index + 1}</Text>
          <View
            style={{
              backgroundColor: `${theme.colors.primary}0d`,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: theme.radius.md,
              borderWidth: 1,
              borderColor
            }}
          >
            <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{candidate.commonName}</Text>
          </View>
        </View>
        <Text style={{ color: theme.colors.muted }}>{candidate.technicalName}</Text>
      </View>

      <ConfidenceBar value={candidate.confidence} />

      <View style={{ marginTop: theme.spacing.sm, gap: 6 }}>
        <Text style={{ color: theme.colors.muted, fontWeight: "700" }}>OEM</Text>
        <Text style={{ color: theme.colors.text }}>{candidate.oemPartNumbers.join(", ")}</Text>
      </View>

      <View style={{ marginTop: theme.spacing.sm, gap: 6 }}>
        <Text style={{ color: theme.colors.muted, fontWeight: "700" }}>Aftermarket</Text>
        <Text style={{ color: theme.colors.text }}>{candidate.aftermarketEquivalents.join(", ")}</Text>
      </View>

      <View style={{ marginTop: theme.spacing.sm, gap: 6 }}>
        <Text style={{ color: theme.colors.muted, fontWeight: "700" }}>Symptoms</Text>
        {candidate.symptoms.map((symptom) => (
          <Text key={symptom} style={{ color: theme.colors.text }}>
            • {symptom}
          </Text>
        ))}
      </View>

      <Text style={{ color: theme.colors.primary, fontWeight: "800", marginTop: theme.spacing.sm }}>{candidate.priceRange}</Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: theme.spacing.md }}>
        {Object.entries(candidate.retailerLinks).map(([key, url]) => (
          <Pressable
            key={key}
            onPress={() => Linking.openURL(url)}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              borderRadius: theme.radius.md,
              backgroundColor: pressed ? `${theme.colors.primary}11` : `${theme.colors.primary}08`
            })}
          >
            <Feather name="external-link" size={16} color={theme.colors.text} />
            <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{retailerLabels[key as keyof typeof retailerLabels]}</Text>
          </Pressable>
        ))}
      </View>

      {onConfirm ? (
        <Pressable
          onPress={onConfirm}
          style={({ pressed }) => ({
            marginTop: theme.spacing.md,
            paddingVertical: theme.spacing.xs,
            alignItems: "center",
            borderRadius: theme.radius.lg,
            backgroundColor: pressed ? `${theme.colors.primary}12` : `${theme.colors.primary}0d`
          })}
        >
          <Text style={{ color: theme.colors.primary, fontWeight: "800" }}>Confirm this part</Text>
        </Pressable>
      ) : null}

      {showQuestions && candidate.questions && candidate.questions.length > 0 ? (
        <View style={{ marginTop: theme.spacing.md, gap: 6, backgroundColor: `${theme.colors.warning}0d`, padding: theme.spacing.sm, borderRadius: theme.radius.md }}>
          <Text style={{ color: theme.colors.text, fontWeight: "800" }}>Questions to confirm</Text>
          {candidate.questions.map((question) => (
            <Text key={question} style={{ color: theme.colors.text }}>
              • {question}
            </Text>
          ))}
        </View>
      ) : null}
    </Card>
  );
}
