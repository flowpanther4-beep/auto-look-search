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
  Analyze: { photoUri: string; vehicle?: VehicleDetails; searchTerm?: string };
  VehicleInfo: { photoUri: string; initialResult: IdentifyPartSuccessResponse; searchTerm?: string };
  Result: { result: IdentifyPartSuccessResponse; photoUri: string; searchTerm?: string };
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
