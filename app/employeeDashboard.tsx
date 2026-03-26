import { useRouter } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EmployeeAI from "../components/EmployeeAI";
import { InventoryContext } from "../lib/InventoryContext";

export default function EmployeeDashboard() {
  const { items, updatePrice, updateStock, logoutEmployee, isEmployeeLoggedIn, loading, error } =
    useContext(InventoryContext);
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

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

  const handleLogout = async () => {
    try {
      await logoutEmployee();
      router.push("/" as any);
    } catch (error) {
      console.error("Logout error:", error);
      // Still navigate away even if logout fails
      router.push("/" as any);
    }
  };

  const handleShowAI = () => {
    setShowAI(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleHideAI = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowAI(false));
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

      {/* Main layout: inventory list */}  
      <View style={styles.mainRow}>
        <ScrollView style={styles.scrollView}>
          {/* Inventory List */}
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => window.location.reload()}
              >
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading inventory...</Text>
            </View>
          ) : (
            <FlatList
              style={styles.list}
              data={items}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              scrollEnabled={false}
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
          )}
        </ScrollView>
      </View>

      {/* AI Insights Button */}
      {!showAI && (
        <TouchableOpacity style={styles.aiButton} onPress={handleShowAI}>
          <Text style={styles.aiButtonText}>AI Insights</Text>
        </TouchableOpacity>
      )}

      {/* Animated AI Panel */}
      {showAI && (
        <Animated.View
          style={[
            styles.aiOverlay,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [Dimensions.get('window').height, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.aiHeader}>
            <TouchableOpacity style={styles.backButton} onPress={handleHideAI}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.aiTitle}>AI Insights</Text>
          </View>
          <View style={styles.aiContent}>
            <EmployeeAI showHeader={false} />
          </View>
        </Animated.View>
      )}

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

  mainRow: {
    flex: 1,
    flexDirection: "column",
  },

  scrollView: {
    flex: 1,
  },

  aiButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ff9800',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  aiButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  aiOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f5f5f5',
    zIndex: 10,
  },

  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  backButtonText: {
    color: '#ff9800',
    fontSize: 18,
    fontWeight: 'bold',
  },

  aiTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  aiContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
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

  list: {
    flex: 1,
  },

  listContent: {
    padding: 12,
    paddingBottom: 16,
  },

  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
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
    gap: 8,
  },

  itemIcon: {
    fontSize: 32,
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
    gap: 12,
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },

  editButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 11,
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

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    fontSize: 18,
    color: "#666",
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },

  retryText: {
    color: "white",
    fontWeight: "bold",
  },
});
