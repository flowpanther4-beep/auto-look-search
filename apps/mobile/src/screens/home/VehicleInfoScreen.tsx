import { useMemo } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HomeStackParamList } from "../../navigation/types";
import { VehicleDetails } from "../../types";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { TextField } from "../../components/TextField";
import { Chip } from "../../components/Chip";
import { PrimaryButton } from "../../components/PrimaryButton";
import { theme } from "../../theme";

const schema = z.object({
  make: z.string().min(1, "Required"),
  model: z.string().min(1, "Required"),
  year: z.string().min(4, "Year"),
  engine: z.string().optional(),
  partLocation: z.string().optional()
});

const PART_LOCATIONS = ["Engine", "Brakes", "Suspension", "Interior", "Electrical"] as const;

type FormValues = z.infer<typeof schema>;

export function VehicleInfoScreen({ route, navigation }: NativeStackScreenProps<HomeStackParamList, "VehicleInfo">) {
  const { initialResult, photoUri, searchTerm } = route.params;
  const { handleSubmit, formState, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      make: initialResult.vehicle.make ?? "",
      model: initialResult.vehicle.model ?? "",
      year: initialResult.vehicle.year ?? "",
      engine: initialResult.vehicle.engine ?? "",
      partLocation: initialResult.vehicle.partLocation ?? ""
    }
  });

  const values = watch();
  const isValid = useMemo(() => formState.isValid, [formState.isValid]);

  const onSubmit = (data: VehicleDetails) => {
    navigation.replace("Analyze", { photoUri, vehicle: data, searchTerm });
  };

  return (
    <Screen scrollable={false}>
      <AppHeader
        accent="Refine results"
        title="Add quick vehicle context"
        subtitle="We only ask when confidence is low. This helps us lock onto the right part."
      />

      <View style={{ flex: 1 }}>
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
          keyboardType="numeric"
        />
        <TextField
          label="Engine (optional)"
          value={values.engine ?? ""}
          onChangeText={(text) => setValue("engine", text, { shouldValidate: true })}
          helper="Trim, displacement, or fuel type"
        />

        <View style={{ marginBottom: theme.spacing.md }}>
          <AppHeader title="Part location" subtitle="Helps prioritize the right subsystem." />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {PART_LOCATIONS.map((location) => (
              <Chip
                key={location}
                label={location}
                selected={values.partLocation === location}
                onPress={() => setValue("partLocation", location, { shouldValidate: true })}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={{ paddingVertical: theme.spacing.sm }}>
        <PrimaryButton title="Re-analyze" onPress={handleSubmit(onSubmit)} disabled={!isValid} />
      </View>
    </Screen>
  );
}
