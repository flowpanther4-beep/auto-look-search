import { useEffect, useMemo, useState } from "react";
import { Animated, ImageBackground, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../navigation/types";
import { mockIdentifyPart } from "../../services/mockIdentifyPart";
import { saveHistoryItem } from "../../storage/history";
import { theme } from "../../theme";

const states = [
  { key: "uploading", label: "Uploading photo...", progress: 0.2 },
  { key: "reading_image", label: "Reading image details...", progress: 0.45 },
  { key: "matching_database", label: "Matching vehicle parts...", progress: 0.75 },
  { key: "finalizing", label: "Finalizing insights...", progress: 1 }
] as const;

type AnalyzeState = (typeof states)[number];

export function AnalyzeScreen({ route, navigation }: NativeStackScreenProps<HomeStackParamList, "Analyze">) {
  const { photoUri, vehicle, searchTerm } = route.params;
  const [current, setCurrent] = useState<AnalyzeState>(states[0]);
  const progress = useMemo(() => new Animated.Value(states[0].progress), []);

  useEffect(() => {
    states.forEach((step, index) => {
      setTimeout(() => {
        setCurrent(step);
        Animated.timing(progress, {
          toValue: step.progress,
          duration: 350,
          useNativeDriver: false
        }).start();
      }, index * 600);
    });
  }, [progress]);

  useEffect(() => {
    const run = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2200));
      const response = await mockIdentifyPart(vehicle, searchTerm);
      await saveHistoryItem({
        id: response.analysisId,
        createdAt: new Date().toISOString(),
        thumbnailUri: photoUri,
        vehicle: response.vehicle,
        topCandidateName: response.topCandidate.commonName,
        response,
        confidence: response.topCandidate.confidence,
        status: "not_sure"
      });

      if (response.topCandidate.confidence < 0.8) {
        navigation.replace("VehicleInfo", { photoUri, initialResult: response, searchTerm });
      } else {
        navigation.replace("Result", { result: response, photoUri, searchTerm });
      }
    };

    void run();
  }, [navigation, photoUri, searchTerm, vehicle]);

  const width = progress.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });

  return (
    <ImageBackground source={{ uri: photoUri }} blurRadius={8} style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(15,23,42,0.55)",
          alignItems: "center",
          justifyContent: "center",
          padding: theme.spacing.lg
        }}
      >
        <StatusBar style="light" />
        <View style={{ backgroundColor: theme.colors.card, borderRadius: theme.radius.xl, padding: theme.spacing.lg, width: "100%" }}>
          <Text style={{ color: theme.colors.muted, fontWeight: "700" }}>Smart analysis</Text>
          <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: "800", marginTop: 8 }}>{current.label}</Text>

          <View style={{ marginTop: theme.spacing.md, height: 10, backgroundColor: theme.colors.border, borderRadius: theme.radius.md, overflow: "hidden" }}>
            <Animated.View style={{ width, height: "100%", backgroundColor: theme.colors.primary }} />
          </View>

          <View style={{ marginTop: theme.spacing.md, gap: 6 }}>
            <Text style={{ color: theme.colors.muted }}>Steps</Text>
            {states.map((step) => (
              <View key={step.key} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 6,
                    backgroundColor: current.key === step.key ? theme.colors.primary : theme.colors.border
                  }}
                />
                <Text style={{ color: current.key === step.key ? theme.colors.text : theme.colors.muted, fontWeight: "700" }}>
                  {step.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
