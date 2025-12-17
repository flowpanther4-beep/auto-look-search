import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { loadHistory } from "../../storage/history";
import { HistoryStackParamList } from "../../navigation/types";
import { HistoryItem } from "../../types";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { ListRow } from "../../components/ListRow";
import { EmptyState } from "../../components/EmptyState";

export function HistoryScreen({ navigation }: NativeStackScreenProps<HistoryStackParamList, "History">) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHistory = useCallback(async () => {
    setRefreshing(true);
    const items = await loadHistory();
    setHistory(items);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    void fetchHistory();
  }, [fetchHistory]);

  return (
    <Screen scrollable={false}>
      <AppHeader title="History" subtitle="See what you've confirmed and revisit low-confidence runs" />
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchHistory} />}
        ListEmptyComponent={() => (
          <EmptyState title="No history yet" description="Analyze a part to see it appear here." icon="📂" />
        )}
        renderItem={({ item }) => (
          <ListRow
            title={item.topCandidateName}
            subtitle={`${item.vehicle.make ?? "Unknown"} ${item.vehicle.model ?? "Model"} ${item.vehicle.year ?? "Year"}`}
            meta={new Date(item.createdAt).toLocaleString()}
            status={item.status}
            thumbnail={item.thumbnailUri}
            confidence={item.confidence}
            onPress={() => navigation.navigate("HistoryDetail", { item })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </Screen>
  );
}
