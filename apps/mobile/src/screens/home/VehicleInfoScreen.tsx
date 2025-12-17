import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { TextField } from "../../components/TextField";
import { HomeStackParamList } from "../../navigation/types";
import { VehicleDetails } from "../../types";

const schema = z.object({
  make: z.string().min(1, "Requerido"),
  model: z.string().min(1, "Requerido"),
  year: z.string().min(4, "Año inválido"),
  engine: z.string().optional(),
  partLocation: z.string().optional()
});

export function VehicleInfoScreen({ route, navigation }: NativeStackScreenProps<HomeStackParamList, "VehicleInfo">) {
  const { handleSubmit, formState, watch, setValue } = useForm<VehicleDetails>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { make: "", model: "", year: "", engine: "", partLocation: "" }
  });

  const values = watch();

  const onSubmit = (data: VehicleDetails) => {
    navigation.navigate("Analyze", { photoUri: route.params.photoUri, vehicle: data });
  };

  const isValid = useMemo(() => formState.isValid, [formState.isValid]);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Datos del vehículo</Text>
      <Text style={styles.subtitle}>Make / Model / Year son obligatorios</Text>

      <View style={styles.form}>
        <TextField
          label="Make"
          value={values.make}
          onChangeText={(text) => setValue("make", text, { shouldValidate: true })}
          error={formState.errors.make?.message}
        />
        <TextField
          label="Model"
          value={values.model}
          onChangeText={(text) => setValue("model", text, { shouldValidate: true })}
          error={formState.errors.model?.message}
        />
        <TextField
          label="Year"
          value={values.year}
          onChangeText={(text) => setValue("year", text, { shouldValidate: true })}
          error={formState.errors.year?.message}
        />
        <TextField
          label="Engine (opcional)"
          value={values.engine ?? ""}
          onChangeText={(text) => setValue("engine", text, { shouldValidate: true })}
        />
        <TextField
          label="Ubicación de la pieza (opcional)"
          value={values.partLocation ?? ""}
          onChangeText={(text) => setValue("partLocation", text, { shouldValidate: true })}
        />
      </View>

      <PrimaryButton title="Analizar" onPress={handleSubmit(onSubmit)} disabled={!isValid} />
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
  form: {
    marginBottom: 16
  }
});
