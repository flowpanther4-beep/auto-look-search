import { IdentifyPartResponse } from "@autopartsnap/shared";

export type VehicleDetails = {
  make: string;
  model: string;
  year: string;
  engine?: string;
  partLocation?: string;
};

export type HistoryItem = {
  id: string;
  createdAt: string;
  thumbnailUri: string;
  vehicle: VehicleDetails;
  topCandidateName: string;
  response: IdentifyPartResponse;
};
