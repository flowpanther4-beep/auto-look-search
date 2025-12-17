import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { Card } from "../../components/Card";
import { theme } from "../../theme";

interface OnboardingScreenProps {
  onDone: () => void;
}

const slides = [
  {
    title: "Snap & analyze",
    description: "Large, bold visuals show you exactly what we're scanning.",
    icon: "camera",
    bullets: ["Shutter + scanning overlay", "AI text updates"]
  },
  {
    title: "Confirm fast",
    description: "Only ask for vehicle details when confidence is low.",
    icon: "zap",
    bullets: ["Confidence-based flow", "Questions to confirm"]
  }
];

export function OnboardingScreen({ onDone }: OnboardingScreenProps) {
  const [index, setIndex] = useState(0);

  const handleContinue = async () => {
    if (index < slides.length - 1) {
      setIndex((prev) => prev + 1);
      return;
    }

    await AsyncStorage.setItem("onboardingComplete", "true");
    onDone();
  };

  const slide = slides[index];

  return (
    <Screen scrollable={false}>
      <AppHeader accent="AutoPartSnap" title="Modern, confident flow" subtitle="A clean, Apple-like experience for instant trust." />

      <Card>
        <View style={{ alignItems: "center", paddingVertical: theme.spacing.md }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: `${theme.colors.primary}0d`,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Feather name={slide.icon as any} size={48} color={theme.colors.primary} />
          </View>
          <Text style={{ color: theme.colors.text, fontWeight: "800", fontSize: 22, marginTop: theme.spacing.sm }}>
            {slide.title}
          </Text>
          <Text style={{ color: theme.colors.muted, textAlign: "center", marginTop: 6 }}>{slide.description}</Text>
        </View>

        <View style={{ gap: 8 }}>
          {slide.bullets.map((bullet) => (
            <View key={bullet} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Feather name="check" color={theme.colors.primary} size={16} />
              <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{bullet}</Text>
            </View>
          ))}
        </View>
      </Card>

      <View style={{ flexDirection: "row", gap: 8, marginTop: theme.spacing.sm }}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={{
              height: 10,
              flex: 1,
              borderRadius: 6,
              backgroundColor: i === index ? theme.colors.primary : theme.colors.border
            }}
          />
        ))}
      </View>

      <View style={{ marginTop: theme.spacing.lg }}>
        <PrimaryButton title={index === slides.length - 1 ? "Continue" : "Next"} onPress={handleContinue} />
      </View>
    </Screen>
  );
}
