import { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InventoryContext } from "../lib/InventoryContext";
import { getBusyForecast, getRestockSuggestions } from "../lib/aiData";

type Tab = "restock" | "forecast";

const LEVEL_COLOR: Record<string, string> = {
  quiet: "#28a745",
  moderate: "#ff9800",
  busy: "#e67e22",
  "very busy": "#dc3545",
};

export default function EmployeeAI() {
  const { items } = useContext(InventoryContext);
  const [tab, setTab] = useState<Tab>("restock");

  const restockSuggestions = getRestockSuggestions(
    items.map((i) => ({ id: i.id, name: i.name, stock: i.stock }))
  );
  const forecast = getBusyForecast();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🤖 AI Insights</Text>
        <Text style={styles.headerSub}>Powered by sales history</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === "restock" && styles.activeTab]}
          onPress={() => setTab("restock")}
        >
          <Text style={[styles.tabText, tab === "restock" && styles.activeTabText]}>
            📦 Restock
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === "forecast" && styles.activeTab]}
          onPress={() => setTab("forecast")}
        >
          <Text style={[styles.tabText, tab === "forecast" && styles.activeTabText]}>
            📈 Forecast
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {tab === "restock" ? (
          <>
            <Text style={styles.sectionLabel}>Based on avg daily sales (last 30 days)</Text>
            {restockSuggestions.map((s) => {
              const isUrgent = s.reason.includes("immediately") || s.reason.includes("1 day");
              return (
                <View key={s.itemId} style={[styles.card, isUrgent && styles.urgentCard]}>
                  <View style={styles.cardRow}>
                    <Text style={styles.cardName}>{s.itemName}</Text>
                    <Text style={styles.cardStock}>Current: {items.find(i => i.id === s.itemId)?.stock ?? 0}</Text>
                  </View>
                  <Text style={styles.cardMeta}>
                    Avg daily sales: <Text style={styles.bold}>{s.avgDailySales}</Text> units
                    {"  "}|{"  "}
                    Suggested stock: <Text style={styles.bold}>{s.suggestedStock}</Text>
                  </Text>
                  <Text style={[styles.cardReason, isUrgent && styles.urgentText]}>
                    {isUrgent ? "⚠️ " : "✅ "}{s.reason}
                  </Text>
                </View>
              );
            })}
          </>
        ) : (
          <>
            <Text style={styles.sectionLabel}>Expected busyness based on historical patterns</Text>
            {forecast.map((f, i) => (
              <View key={i} style={styles.forecastRow}>
                <Text style={styles.forecastDay}>{f.label}</Text>
                <View style={styles.forecastBar}>
                  <View
                    style={[
                      styles.forecastFill,
                      {
                        width: `${Math.min((f.expectedSales / 60) * 100, 100)}%`,
                        backgroundColor: LEVEL_COLOR[f.level],
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.forecastLevel, { color: LEVEL_COLOR[f.level] }]}>
                  {f.level}
                </Text>
              </View>
            ))}
            <View style={styles.legend}>
              {Object.entries(LEVEL_COLOR).map(([label, color]) => (
                <View key={label} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: color }]} />
                  <Text style={styles.legendText}>{label}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#1a1a2e",
    padding: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSub: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#ff9800",
  },
  tabText: { color: "#999", fontWeight: "600", fontSize: 13 },
  activeTabText: { color: "#ff9800" },
  content: { padding: 12 },
  sectionLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 10,
    fontStyle: "italic",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#28a745",
    elevation: 1,
  },
  urgentCard: {
    borderLeftColor: "#dc3545",
    backgroundColor: "#fff5f5",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  cardName: { fontWeight: "bold", fontSize: 14, color: "#333" },
  cardStock: { fontSize: 12, color: "#666" },
  cardMeta: { fontSize: 12, color: "#555", marginBottom: 4 },
  bold: { fontWeight: "bold", color: "#333" },
  cardReason: { fontSize: 12, color: "#28a745" },
  urgentText: { color: "#dc3545" },
  forecastRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  forecastDay: { width: 70, fontSize: 13, fontWeight: "600", color: "#333" },
  forecastBar: {
    flex: 1,
    height: 14,
    backgroundColor: "#eee",
    borderRadius: 7,
    overflow: "hidden",
  },
  forecastFill: { height: "100%", borderRadius: 7 },
  forecastLevel: { width: 65, fontSize: 11, fontWeight: "600", textAlign: "right" },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
    marginBottom: 20,
  },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11, color: "#666" },
});
