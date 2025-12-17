import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenContainer } from "../../components/ScreenContainer";

interface OnboardingScreenProps {
  onDone: () => void;
}

const slides = [
  {
    title: "Toma una foto",
    description: "Captura la pieza directamente desde tu cámara para identificarla al instante.",
    emoji: "📷"
  },
  {
    title: "Confirma tu vehículo",
    description: "Añade make/model/year y recibe la pieza correcta con preguntas de confirmación.",
    emoji: "🚗"
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
    <ScreenContainer>
      <View style={styles.badge}> 
        <Text style={styles.badgeText}>AutoPartSnap</Text>
      </View>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{slide.emoji}</Text>
      </View>
      <Text style={styles.title}>{slide.title}</Text>
      <Text style={styles.description}>{slide.description}</Text>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        <PrimaryButton title={index === slides.length - 1 ? "Comenzar" : "Continuar"} onPress={handleContinue} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#e0f2fe",
    borderRadius: 12,
    marginBottom: 20
  },
  badgeText: {
    color: "#0369a1",
    fontWeight: "700"
  },
  emojiContainer: {
    width: "100%",
    height: 240,
    borderRadius: 20,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  emoji: {
    fontSize: 96
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 8
  },
  description: {
    color: "#475569",
    fontSize: 16,
    marginBottom: 24
  },
  footer: {
    marginTop: "auto"
  },
  dots: {
    flexDirection: "row",
    marginBottom: 12
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e2e8f0",
    marginRight: 8
  },
  dotActive: {
    backgroundColor: "#0ea5e9",
    width: 22
  }
});
