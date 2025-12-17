import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryItem } from "../types";

const STORAGE_KEY = "history";

export async function loadHistory(): Promise<HistoryItem[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as HistoryItem[];
    return parsed;
  } catch (error) {
    console.error("Failed to parse history", error);
    return [];
  }
}

export async function saveHistoryItem(item: HistoryItem): Promise<void> {
  const current = await loadHistory();
  const updated = [item, ...current.filter((existing) => existing.id !== item.id)];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function updateHistoryStatus(id: string, status: HistoryItem["status"]): Promise<void> {
  const current = await loadHistory();
  const updated = current.map((entry) => (entry.id === id ? { ...entry, status } : entry));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
