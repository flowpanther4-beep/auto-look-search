import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { IdentifyPartResponseSchema } from "@autopartsnap/shared";
import { RootNavigator } from "./src/navigation/RootNavigator";

export default function App() {
  useMemo(() => {
    IdentifyPartResponseSchema.safeParse({
      success: true,
      analysisId: "ping",
      vehicle: { make: "Test", model: "Model", year: "2024" },
      topCandidate: {
        id: "1",
        commonName: "Test Part",
        technicalName: "Component",
        confidence: 0.99,
        symptoms: [],
        oemPartNumbers: [],
        aftermarketEquivalents: [],
        priceRange: "-",
        searchQuery: "",
        retailerLinks: { amazon: "https://example.com", ebay: "https://example.com", rockauto: "https://example.com" }
      },
      candidates: [
        {
          id: "1",
          commonName: "Test Part",
          technicalName: "Component",
          confidence: 0.99,
          symptoms: [],
          oemPartNumbers: [],
          aftermarketEquivalents: [],
          priceRange: "-",
          searchQuery: "",
          retailerLinks: {
            amazon: "https://example.com",
            ebay: "https://example.com",
            rockauto: "https://example.com"
          }
        }
      ]
    });
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <RootNavigator />
    </>
  );
}
