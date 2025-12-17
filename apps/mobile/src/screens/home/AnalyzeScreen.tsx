import { useEffect, useMemo, useState } from "react";
import { Animated, ImageBackground, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../navigation/types";
import { mockIdentifyPart } from "../../services/mockIdentifyPart";
import { saveHistoryItem } from "../../storage/history";
import { theme } from "../../theme";

const states = [
  { key: "analizando", label: "Analizando la pieza...", progress: 0.2 },
  { key: "comparando", label: "Comparando con base de datos...", progress: 0.5 },
  { key: "compatibilidad", label: "Buscando compatibilidad...", progress: 0.78 },
  { key: "finalizando", label: "Preparando recomendaciones...", progress: 1 }
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
          backgroundColor: "rgba(12,17,33,0.65)",
          alignItems: "center",
          justifyContent: "center",
          padding: theme.spacing.lg
        }}
      >
        <StatusBar style="light" />
        <View style={{ backgroundColor: theme.colors.card, borderRadius: theme.radius.xl, padding: theme.spacing.lg, width: "100%", gap: theme.spacing.md }}>
          <View style={{ alignSelf: "flex-start", backgroundColor: "rgba(15,37,110,0.08)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}>
            <Text style={{ color: theme.colors.primary, fontWeight: "800" }}>AutoPartSnap Pro</Text>
          </View>

          <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: "800" }}>Analizando tu captura</Text>
          <Text style={{ color: theme.colors.muted }}>
            Estamos procesando la foto, comparando con miles de referencias y calculando compatibilidad con tu vehículo.
          </Text>

          <View style={{ alignItems: "center", gap: 10 }}>
            <View
              style={{
                width: 90,
                height: 90,
                borderRadius: 48,
                borderWidth: 12,
                borderColor: "rgba(15,37,110,0.12)",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Animated.View style={{ transform: [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1.05] }) }] }}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 18,
                    backgroundColor: theme.colors.primary,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "800" }}>{Math.round(states.findIndex((s) => s.key === current.key) / (states.length - 1) * 100)}%</Text>
                </View>
              </Animated.View>
            </View>
            <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "800" }}>{current.label}</Text>
            <Text style={{ color: theme.colors.muted }}>No cierres la app, esto tarda unos segundos.</Text>
          </View>

          <View style={{ height: 12, backgroundColor: theme.colors.border, borderRadius: theme.radius.md, overflow: "hidden" }}>
            <Animated.View style={{ width, height: "100%", backgroundColor: theme.colors.primary }} />
          </View>

          <View style={{ gap: 8 }}>
            <Text style={{ color: theme.colors.muted, fontWeight: "700" }}>Pasos en vivo</Text>
            {states.map((step) => (
              <View
                key={step.key}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 6,
                  paddingHorizontal: 6,
                  backgroundColor: current.key === step.key ? "rgba(15,37,110,0.06)" : "transparent",
                  borderRadius: 12
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
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
                <Text style={{ color: current.key === step.key ? theme.colors.primary : theme.colors.muted }}>{Math.round(step.progress * 100)}%</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
