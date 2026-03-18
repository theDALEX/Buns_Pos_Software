import { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InventoryContext } from "../lib/InventoryContext";
import { getCustomerSuggestions } from "../lib/aiData";

export default function CustomerAI() {
  const { cart, addToCart, items } = useContext(InventoryContext);
  const [expanded, setExpanded] = useState(false);

  const cartItemIds = cart.map((i) => i.id);
  const suggestions = getCustomerSuggestions(cartItemIds);

  const handleAddSuggestion = (itemIds: string[]) => {
    itemIds.forEach((id) => {
      const item = items.find((i) => i.id === id);
      if (item && item.stock > 0) addToCart(item);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.headerText}>🤖 AI Assistant</Text>
        <Text style={styles.chevron}>{expanded ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.body}>
          {suggestions.length === 0 ? (
            <Text style={styles.empty}>Your order looks great! 🎉</Text>
          ) : (
            suggestions.map((s, i) => (
              <View key={i} style={styles.card}>
                <Text style={styles.cardTitle}>{s.title}</Text>
                <Text style={styles.cardDesc}>{s.description}</Text>
                {s.savings && (
                  <Text style={styles.savings}>Save £{s.savings.toFixed(2)}</Text>
                )}
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => handleAddSuggestion(s.itemIds)}
                >
                  <Text style={styles.addBtnText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ff9800",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  headerText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  chevron: { color: "#fff", fontSize: 12 },
  body: { padding: 10, gap: 8 },
  empty: { color: "#666", textAlign: "center", padding: 8 },
  card: {
    backgroundColor: "#fff8f0",
    borderRadius: 8,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#ff9800",
  },
  cardTitle: { fontWeight: "bold", fontSize: 13, color: "#333", marginBottom: 2 },
  cardDesc: { fontSize: 12, color: "#555", marginBottom: 4 },
  savings: { fontSize: 12, color: "#28a745", fontWeight: "bold", marginBottom: 4 },
  addBtn: {
    backgroundColor: "#ff9800",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  addBtnText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});
