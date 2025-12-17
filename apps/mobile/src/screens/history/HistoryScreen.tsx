import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { loadHistory } from "../../storage/history";
import { HistoryStackParamList } from "../../navigation/types";
import { HistoryItem } from "../../types";
import { ScreenContainer } from "../../components/ScreenContainer";

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
    <ScreenContainer scrollable={false}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchHistory} />}
        ListEmptyComponent={() => (
          <View style={styles.empty}> 
            <Text style={styles.emptyTitle}>Sin historial</Text>
            <Text style={styles.emptySubtitle}>Analiza una pieza para verla aquí</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => navigation.navigate("HistoryDetail", { item })}>
            <Image source={{ uri: item.thumbnailUri }} style={styles.thumb} />
            <View style={styles.meta}>
              <Text style={styles.title}>{item.topCandidateName}</Text>
              <Text style={styles.subtitle}>{item.vehicle.make} {item.vehicle.model} {item.vehicle.year}</Text>
              <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
          </Pressable>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: "center",
    marginTop: 40
  },
  emptyTitle: {
    fontWeight: "800",
    color: "#0f172a",
    fontSize: 18
  },
  emptySubtitle: {
    color: "#475569",
    marginTop: 6
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: 12,
    marginRight: 12
  },
  meta: {
    flex: 1
  },
  title: {
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4
  },
  subtitle: {
    color: "#475569"
  },
  date: {
    color: "#94a3b8",
    marginTop: 6
  }
});
