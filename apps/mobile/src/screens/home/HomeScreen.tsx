import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Image, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import { PrimaryButton, SecondaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { Card } from "../../components/Card";
import { AppHeader } from "../../components/AppHeader";
import { HomeStackParamList } from "../../navigation/types";
import { theme } from "../../theme";

const overlayTexts = [
  "Analizando la pieza...",
  "Comparando con base de datos...",
  "Buscando compatibilidad..."
];

export function HomeScreen({ navigation }: NativeStackScreenProps<HomeStackParamList, "Home">) {
  const [lastPhoto, setLastPhoto] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [overlayIndex, setOverlayIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const shutterOpacity = useRef(new Animated.Value(0)).current;
  const scanTranslate = useRef(new Animated.Value(-140)).current;
  const scanLoop = useRef<Animated.CompositeAnimation | null>(null);
  const overlayInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showOverlay) {
      overlayInterval.current = setInterval(() => {
        setOverlayIndex((prev) => (prev + 1) % overlayTexts.length);
      }, 600);
    } else if (overlayInterval.current) {
      clearInterval(overlayInterval.current);
      overlayInterval.current = null;
    }

    return () => {
      if (overlayInterval.current) {
        clearInterval(overlayInterval.current);
      }
    };
  }, [showOverlay]);

  const startShutter = () => {
    setShowOverlay(true);
    Animated.sequence([
      Animated.timing(shutterOpacity, { toValue: 1, duration: 80, useNativeDriver: true }),
      Animated.timing(shutterOpacity, { toValue: 0, duration: 220, useNativeDriver: true })
    ]).start();

    scanLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(scanTranslate, { toValue: 220, duration: 900, useNativeDriver: true }),
        Animated.timing(scanTranslate, { toValue: -140, duration: 0, useNativeDriver: true })
      ])
    );

    scanLoop.current.start();
  };

  const goToAnalyze = (uri: string) => {
    const hint = searchTerm.trim();
    setLastPhoto(uri);
    startShutter();
    setTimeout(() => {
      scanLoop.current?.stop();
      scanTranslate.setValue(-140);
      setShowOverlay(false);
      navigation.navigate("Analyze", { photoUri: uri, searchTerm: hint || undefined });
    }, 1000);
  };

  const handleTakePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permisos", "Necesitamos acceso a tu cámara para continuar");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.9 });
    if (!result.canceled && result.assets[0]?.uri) {
      goToAnalyze(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permisos", "Necesitamos acceso a tus fotos para continuar");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.9 });
    if (!result.canceled && result.assets[0]?.uri) {
      goToAnalyze(result.assets[0].uri);
    }
  };

  return (
    <Screen>
      <View style={{ gap: theme.spacing.md }}>
        <AppHeader
          accent="Premium · Instantáneo"
          title="Identifica tu pieza"
          subtitle="Toma o sube una foto para analizarla con nuestra IA."
        />

        <Card>
          <View style={{ gap: theme.spacing.md }}>
            <View style={{ gap: 6 }}>
              <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: "800" }}>Captura limpia y rápida</Text>
              <Text style={{ color: theme.colors.muted }}>
                Abre la cámara o sube la foto. Nosotros nos encargamos de detectar la pieza y guiarte para comprarla.
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#eef2ff",
                borderRadius: theme.radius.xl,
                padding: theme.spacing.md,
                borderWidth: 1,
                borderColor: "#e0e7ff",
                alignItems: "center",
                gap: theme.spacing.sm
              }}
            >
              <View
                style={{
                  backgroundColor: "#0f256e",
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#0f256e",
                  shadowOpacity: 0.18,
                  shadowRadius: 16,
                  shadowOffset: { width: 0, height: 12 },
                  elevation: 5
                }}
              >
                <Feather name="camera" size={28} color="#fff" />
              </View>
              <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "800" }}>Cámara inteligente</Text>
              <Text style={{ color: theme.colors.muted, textAlign: "center" }}>
                Enfoca conectores, etiquetas o texturas. No necesitas encuadrar perfecto: la app limpia y destaca lo importante.
              </Text>
            </View>

            <View style={{ gap: 10 }}>
              <PrimaryButton title="Tomar foto" onPress={handleTakePhoto} icon={<Feather name="camera" size={18} color="#fff" />} />
              <SecondaryButton
                title="Subir foto"
                onPress={handleUpload}
                icon={<Feather name="image" size={18} color={theme.colors.text} />}
              />
            </View>

            <View style={{ gap: 10 }}>
              <Text style={{ color: theme.colors.muted, fontWeight: "700" }}>Añadir pista (opcional)</Text>
              <TextInput
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Ej. sensor de oxígeno, bomba de agua"
                placeholderTextColor={theme.colors.muted}
                style={{
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                  borderWidth: 1,
                  borderRadius: theme.radius.lg,
                  paddingHorizontal: theme.spacing.md,
                  paddingVertical: theme.spacing.sm,
                  color: theme.colors.text
                }}
              />
            </View>
          </View>
        </Card>

        <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
          {[
            { title: "Luz natural, sin flash", icon: "🌤️" },
            { title: "Acerca el conector", icon: "🧩" },
            { title: "Incluye etiquetas o códigos", icon: "🏷️" },
            { title: "Evita sombras", icon: "✨" }
          ].map((tip) => (
            <Card key={tip.title} padded={true}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Text style={{ fontSize: 18 }}>{tip.icon}</Text>
                <Text style={{ color: theme.colors.text, fontWeight: "700", flexShrink: 1 }}>{tip.title}</Text>
              </View>
            </Card>
          ))}
        </View>

        {lastPhoto ? (
          <Card>
            <Text style={{ color: theme.colors.muted, marginBottom: 8 }}>Última captura</Text>
            <Image source={{ uri: lastPhoto }} style={{ width: "100%", height: 220, borderRadius: theme.radius.lg }} />
          </Card>
        ) : null}
      </View>

      {showOverlay && lastPhoto ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(12,18,38,0.62)",
            justifyContent: "center",
            alignItems: "center",
            padding: theme.spacing.lg
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(15,23,42,0.55)",
              opacity: shutterOpacity
            }}
          />
          <Image
            source={{ uri: lastPhoto }}
            style={{ width: "95%", height: "70%", borderRadius: theme.radius.xl, opacity: 0.75 }}
            blurRadius={4}
          />
          <Animated.View
            style={{
              position: "absolute",
              width: "70%",
              height: 3,
              backgroundColor: theme.colors.accent,
              borderRadius: 6,
              transform: [{ translateY: scanTranslate }]
            }}
          />
          <View style={{ marginTop: theme.spacing.xl, backgroundColor: "rgba(255,255,255,0.08)", padding: theme.spacing.md, borderRadius: theme.radius.lg }}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "800", textAlign: "center" }}>
              {overlayTexts[overlayIndex]}
            </Text>
          </View>
        </View>
      ) : null}
    </Screen>
  );
}
