import { IdentifyPartResponse } from "@autopartsnap/shared";
import { HistoryItem, VehicleDetails } from "../types";

export type IdentifyPartSuccessResponse = Extract<IdentifyPartResponse, { success: true }>;

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  App: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  VehicleInfo: { photoUri: string };
  Analyze: { photoUri: string; vehicle: VehicleDetails };
  Result: { result: IdentifyPartSuccessResponse; photoUri: string };
};

export type HistoryStackParamList = {
  History: undefined;
  HistoryDetail: { item: HistoryItem };
};

export type AppTabParamList = {
  HomeTab: undefined;
  HistoryTab: undefined;
  Pro: undefined;
};
