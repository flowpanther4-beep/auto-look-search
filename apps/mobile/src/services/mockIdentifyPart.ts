import { IdentifyPartResponse } from "@autopartsnap/shared";
import { VehicleDetails } from "../types";
import { IdentifyPartSuccessResponse } from "../navigation/types";

const AMAZON_TAG = process.env.EXPO_PUBLIC_AMAZON_TAG;
const EBAY_CAMPID = process.env.EXPO_PUBLIC_EBAY_CAMPID;

function buildRetailerLinks(query: string) {
  const encoded = encodeURIComponent(query);
  const amazon = `https://www.amazon.com/s?k=${encoded}${AMAZON_TAG ? `&tag=${AMAZON_TAG}` : ""}`;
  const ebay = `https://www.ebay.com/sch/i.html?_nkw=${encoded}${EBAY_CAMPID ? `&campid=${EBAY_CAMPID}` : ""}`;
  const rockauto = `https://www.rockauto.com/en/partsearch/?partsearch=${encoded}`;

  return { amazon, ebay, rockauto } as IdentifyPartSuccessResponse["topCandidate"]["retailerLinks"];
}

const baseCandidates = [
  {
    id: "alt",
    commonName: "Alternador",
    technicalName: "Alternador de alta salida",
    confidence: 0.78,
    symptoms: [
      "Luces del tablero parpadean",
      "Batería se descarga rápidamente",
      "Olor a cable quemado"
    ],
    oemPartNumbers: ["23100-EA00A", "23100-EA00B"],
    aftermarketEquivalents: ["Bosch AL6435N", "Denso 210-3123"],
    priceRange: "$180 - $320",
    questions: [
      "¿Notas chirridos al encender?",
      "¿El voltaje cae debajo de 12V con el motor encendido?"
    ]
  },
  {
    id: "wp",
    commonName: "Bomba de agua",
    technicalName: "Ensamble de bomba de agua con polea",
    confidence: 0.63,
    symptoms: ["Goteo de refrigerante", "Calentamiento al ralentí", "Zumbido cerca de la polea"],
    oemPartNumbers: ["16100-39436", "16100-39435"],
    aftermarketEquivalents: ["Aisin WPT-190", "Gates 45005"],
    priceRange: "$85 - $140",
    questions: ["¿El líquido pierde color?", "¿Sientes juego en la polea?"]
  },
  {
    id: "ignition-coil",
    commonName: "Bobina de encendido",
    technicalName: "Módulo de bobina individual",
    confidence: 0.42,
    symptoms: ["Fallas en frío", "Check engine P0300", "Olor a gasolina cruda"],
    oemPartNumbers: ["22448-JA10B"],
    aftermarketEquivalents: ["NGK U5159", "Delphi GN10571"],
    priceRange: "$40 - $75",
    questions: ["¿Vibración al acelerar?", "¿Se sienten tirones entre 1-2k RPM?"]
  }
];

function normalizeVehicle(vehicle: VehicleDetails): Required<VehicleDetails> {
  return {
    make: vehicle.make?.trim() || "Unknown",
    model: vehicle.model?.trim() || "Model",
    year: vehicle.year?.trim() || new Date().getFullYear().toString(),
    engine: vehicle.engine?.trim() || "",
    partLocation: vehicle.partLocation?.trim() || ""
  };
}

export async function mockIdentifyPart(vehicle: VehicleDetails = {}, searchTerm?: string): Promise<IdentifyPartSuccessResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const normalizedVehicle = normalizeVehicle(vehicle);
  const confidenceSwing = Math.random() * 0.25 - 0.05;

  const enriched = baseCandidates.map((candidate, idx) => {
    const primaryOem = candidate.oemPartNumbers[0] ?? "";
    const hint = searchTerm?.trim() ? `${searchTerm} ` : "";
    const searchQuery = `${hint}${candidate.commonName} ${normalizedVehicle.make} ${normalizedVehicle.model} ${normalizedVehicle.year} ${primaryOem}`.trim();
    const confidence = Math.min(0.96, Math.max(0.45, candidate.confidence + confidenceSwing + idx * 0.04));

    return {
      ...candidate,
      confidence,
      searchQuery,
      retailerLinks: buildRetailerLinks(searchQuery)
    } satisfies IdentifyPartSuccessResponse["topCandidate"];
  });

  const sorted = [...enriched].sort((a, b) => b.confidence - a.confidence);
  const topCandidate = sorted[0];

  const response: IdentifyPartResponse = {
    success: true,
    analysisId: `mock-${Date.now()}`,
    vehicle: normalizedVehicle,
    topCandidate,
    candidates: sorted
  };

  return response as IdentifyPartSuccessResponse;
}
