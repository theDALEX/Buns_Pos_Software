import { useRouter } from "expo-router";
import { useContext } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartContext, MenuItem } from "./CartContext";

const SAMPLE_MENU: MenuItem[] = [
  { id: "1", name: "Cheeseburger", price: 5.99 },
  { id: "2", name: "Fries", price: 2.99 },
  { id: "3", name: "Soda", price: 1.99 },
  { id: "4", name: "Pizza", price: 8.5 },
  { id: "5", name: "Ice Cream", price: 3.25 },
  { id: "6", name: "Salad", price: 4.75 },
];

export default function MenuScreen() {
  const { addToCart, cart, removeFromCart } = useContext(CartContext);
  const router = useRouter();
  const total = cart.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <View style={styles.container}>
      <View style={styles.cartColumn}>
        <Text style={styles.cartTitle}>Cart</Text>
        <Text>Items: {cart.reduce((s, i) => s + i.quantity, 0)}</Text>
        <Text>Total: ${total.toFixed(2)}</Text>
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
                router.push('/checkout');
              }}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.menuColumn}>
        <FlatList
          data={SAMPLE_MENU}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.icon}>🍔</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");
const cartWidth = width * 0.35;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", padding: 8 },
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
  itemPrice: { marginBottom: 8 },
  addButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  addText: { color: "white" },
});
