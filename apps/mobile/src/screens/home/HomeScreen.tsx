import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { useState } from "react";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { HomeStackParamList } from "../../navigation/types";

export function HomeScreen({ navigation }: NativeStackScreenProps<HomeStackParamList, "Home">) {
  const [lastPhoto, setLastPhoto] = useState<string | undefined>();

  const goToVehicleInfo = (uri: string) => {
    setLastPhoto(uri);
    navigation.navigate("VehicleInfo", { photoUri: uri });
  };

  const handleTakePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permisos", "Necesitamos acceso a tu cámara para continuar");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!result.canceled && result.assets[0]?.uri) {
      goToVehicleInfo(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permisos", "Necesitamos acceso a tus fotos para continuar");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!result.canceled && result.assets[0]?.uri) {
      goToVehicleInfo(result.assets[0].uri);
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Identifica tu pieza</Text>
      <Text style={styles.subtitle}>Captura o sube una foto para analizar</Text>

      <View style={styles.actions}> 
        <PrimaryButton title="Tomar foto" onPress={handleTakePhoto} />
        <PrimaryButton title="Subir foto" variant="secondary" onPress={handleUpload} />
      </View>

      {lastPhoto ? (
        <View style={styles.preview}>
          <Text style={styles.previewLabel}>Última imagen seleccionada</Text>
          <Image source={{ uri: lastPhoto }} style={styles.image} />
        </View>
      ) : null}
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
    marginBottom: 24
  },
  actions: {
    marginBottom: 12
  },
  preview: {
    marginTop: 24
  },
  previewLabel: {
    color: "#0f172a",
    marginBottom: 8,
    fontWeight: "600"
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 16
  }
});
