import { useRouter } from "expo-router";
import { useContext } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomerAI from "../components/CustomerAI";
import { InventoryContext } from "../lib/InventoryContext";

export default function MenuScreen() {
  const { addToCart, cart, removeFromCart, items, loading, error } = useContext(InventoryContext);
  const router = useRouter();
  const total = cart.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <View style={styles.pageContainer}>
      {/* CUSTOM HEADER */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/menuDeals" as any)}
        >
          <Text style={styles.navText}>Deals</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.employeeButton}
          onPress={() => router.push("/employeeLogin" as any)}
        >
          <Text style={styles.employeeButtonText}>Staff</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.cartColumn}>
          <Text style={styles.cartTitle}>Cart</Text>
          <Text>Items: {cart.reduce((s, i) => s + i.quantity, 0)}</Text>
          <Text>Total: £{total.toFixed(2)}</Text>
          {cart.length > 0 && (
            <>
              <FlatList
                data={cart}
                keyExtractor={(i) => i.id}
                style={styles.cartList}
                renderItem={({ item }) => (
                  <View style={styles.cartItemRow}>
                    <Text>
                      {item.name} x{item.quantity}
                    </Text>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                      <Text style={styles.removeText}>×</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => {
                  // placeholder for checkout action
                  console.log('checkout', cart, total);
                  router.push('/checkOut' as any);
                }}
              >
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>
            </>
          )}
          <CustomerAI />
        </View>

        <View style={styles.menuColumn}>
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
              <Text style={styles.loadingText}>Loading menu...</Text>
            </View>
          ) : (
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.row}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.icon}>{item.icon}</Text>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>£{item.price.toFixed(2)}</Text>
                  <Text style={item.stock > 0 ? styles.stockAvailable : styles.stockOutOfStock}>
                    {item.stock > 0 ? `Stock: ${item.stock}` : "Out of Stock"}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.addButton,
                      { opacity: item.stock > 0 ? 1 : 0.5 }
                    ]}
                    onPress={() => {
                      if (item.stock > 0) {
                        addToCart(item);
                      } else {
                        Alert.alert("Out of Stock", `${item.name} is currently unavailable`);
                      }
                    }}
                    disabled={item.stock <= 0}
                  >
                    <Text style={styles.addText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");
const cartWidth = width * 0.35;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", padding: 8 },
  pageContainer: {
    flex: 1,
    paddingTop: 0,
  },

  header: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    justifyContent: "space-between",
  },

  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  navButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  navText: {
    color: "white",
    fontWeight: "bold",
  },

  employeeButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  employeeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },

  cartColumn: {
    width: cartWidth,
    backgroundColor: "#fff",
    padding: 8,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  cartTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  cartList: { marginTop: 8 },
  cartItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  removeText: { color: "red", fontWeight: "bold" },
  checkoutButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },
  checkoutText: { color: "white", fontWeight: "bold" },
  menuColumn: { flex: 1, paddingLeft: 8 },
  row: { justifyContent: "space-between" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: (width - cartWidth - 32) / 2,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: { fontSize: 32, marginBottom: 8 },
  itemName: { fontWeight: "bold", marginBottom: 4, textAlign: "center" },
  itemPrice: { marginBottom: 8, fontWeight: "bold", fontSize: 14 },
  stockAvailable: {
    fontSize: 12,
    color: "#28a745",
    marginBottom: 8,
    fontWeight: "500",
  },
  stockOutOfStock: {
    fontSize: 12,
    color: "#dc3545",
    marginBottom: 8,
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  addText: { color: "white", fontWeight: "bold" },
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
