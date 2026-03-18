import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { InventoryContext } from "../lib/InventoryContext";

export default function EmployeeDashboard() {
  const { items, updatePrice, updateStock, logoutEmployee, isEmployeeLoggedIn } =
    useContext(InventoryContext);
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isEmployeeLoggedIn) {
      router.push("/employeeLogin" as any);
    }
  }, [isEmployeeLoggedIn]);

  if (!isEmployeeLoggedIn) return null;

  const handleEditItem = (id: string, currentPrice: number, currentStock: number) => {
    setEditingId(id);
    setEditPrice(currentPrice.toString());
    setEditStock(currentStock.toString());
    setModalVisible(true);
  };

  const handleSaveChanges = () => {
    if (!editingId) return;

    const newPrice = parseFloat(editPrice);
    const newStock = parseInt(editStock);

    if (isNaN(newPrice) || isNaN(newStock)) {
      Alert.alert("Error", "Please enter valid numbers");
      return;
    }

    updatePrice(editingId, newPrice);
    updateStock(editingId, newStock);
    Alert.alert("Success", "Item updated successfully");
    setModalVisible(false);
    setEditingId(null);
  };

  const handleLogout = () => {
    logoutEmployee();
    router.push("/" as any);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>Inventory Management</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Inventory List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemIcon}>{item.icon}</Text>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.priceStockRow}>
                  <Text style={styles.itemDetails}>
                    Price: <Text style={styles.value}>£{item.price.toFixed(2)}</Text>
                  </Text>
                  <Text style={styles.itemDetails}>
                    Stock: <Text style={styles.value}>{item.stock}</Text>
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                handleEditItem(item.id, item.price, item.stock)
              }
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Edit Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Item</Text>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Price (£)</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter price"
                value={editPrice}
                onChangeText={setEditPrice}
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Stock Quantity</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter stock"
                value={editStock}
                onChangeText={setEditStock}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.formButton, styles.saveButton]}
                onPress={handleSaveChanges}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.formButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  logoutButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },

  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },

  listContent: {
    padding: 16,
    paddingBottom: 20,
  },

  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  itemHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  itemIcon: {
    fontSize: 40,
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },

  priceStockRow: {
    flexDirection: "row",
    gap: 16,
  },

  itemDetails: {
    fontSize: 13,
    color: "#666",
  },

  value: {
    fontWeight: "bold",
    color: "#ff9800",
  },

  editButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },

  editButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },

  formSection: {
    marginBottom: 20,
  },

  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },

  formInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fafafa",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },

  formButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  saveButton: {
    backgroundColor: "#ff9800",
  },

  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },

  cancelButtonText: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 14,
  },
});
