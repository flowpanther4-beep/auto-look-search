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

const overlayTexts = ["Analyzing shape...", "Detecting connectors...", "Matching vehicle parts..."];

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
    setLastPhoto(uri);
    startShutter();
    setTimeout(() => {
      scanLoop.current?.stop();
      scanTranslate.setValue(-140);
      setShowOverlay(false);
      navigation.navigate("Analyze", { photoUri: uri, searchTerm });
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
      <AppHeader
        accent="AI-powered"
        title="Identify a part in seconds"
        subtitle="Snap, upload, and let the assistant do the heavy lifting."
      />

      <Card>
        <Text style={{ color: theme.colors.muted, fontWeight: "600" }}>What part are you trying to identify?</Text>
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="e.g. alternator, sensor, brake caliper"
          placeholderTextColor={theme.colors.muted}
          style={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            borderWidth: 1,
            borderRadius: theme.radius.lg,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            color: theme.colors.text,
            marginTop: theme.spacing.sm
          }}
        />

        <View style={{ marginTop: theme.spacing.md, gap: 10 }}>
          <PrimaryButton
            title="Take photo"
            onPress={handleTakePhoto}
            icon={<Feather name="camera" size={18} color="#fff" />}
          />
          <SecondaryButton
            title="Upload photo"
            onPress={handleUpload}
            icon={<Feather name="image" size={18} color={theme.colors.text} />}
          />
        </View>
      </Card>

      <View style={{ flexDirection: "row", gap: 12, marginBottom: theme.spacing.md }}>
        {[
          { title: "Use natural light", icon: "🌤️" },
          { title: "Focus on connectors", icon: "🧩" },
          { title: "Capture labels", icon: "🏷️" }
        ].map((tip) => (
          <Card key={tip.title} padded={true}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={{ fontSize: 18 }}>{tip.icon}</Text>
              <Text style={{ color: theme.colors.text, fontWeight: "700", flexShrink: 1 }}>{tip.title}</Text>
            </View>
          </Card>
        ))}
      </View>

      {lastPhoto ? (
        <Card>
          <Text style={{ color: theme.colors.muted, marginBottom: 8 }}>Last capture</Text>
          <Image source={{ uri: lastPhoto }} style={{ width: "100%", height: 220, borderRadius: theme.radius.lg }} />
        </Card>
      ) : null}

      {showOverlay && lastPhoto ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15,23,42,0.5)",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(15,23,42,0.45)",
              opacity: shutterOpacity
            }}
          />
          <Image
            source={{ uri: lastPhoto }}
            style={{ width: "90%", height: "70%", borderRadius: theme.radius.xl, opacity: 0.8 }}
            blurRadius={3}
          />
          <Animated.View
            style={{
              position: "absolute",
              width: "70%",
              height: 2,
              backgroundColor: "#22d3ee",
              transform: [{ translateY: scanTranslate }]
            }}
          />
          <View style={{ marginTop: theme.spacing.xl }}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "800", textAlign: "center" }}>
              {overlayTexts[overlayIndex]}
            </Text>
          </View>
        </View>
      ) : null}
    </Screen>
  );
}
