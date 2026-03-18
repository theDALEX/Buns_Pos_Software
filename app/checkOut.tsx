import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { InventoryContext } from "../lib/InventoryContext";

export default function CheckoutScreen() {
  const { cart, clearCart, removeFromCart } = useContext(InventoryContext);
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  // ✅ Calculate total using your cart structure
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!name || !address) {
      Alert.alert("Error", "Please enter your name and address.");
      return;
    }

    if (cart.length === 0) {
      Alert.alert("Cart Empty", "Please add items before checkout.");
      return;
    }

    Alert.alert(
      "Order Confirmed 🎉",
      `Thanks ${name}! Your total is £${total.toFixed(2)}`
    );

    clearCart();
    router.push("/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      {/* CART ITEMS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Order</Text>

        {cart.length === 0 ? (
          <Text style={{ marginTop: 10 }}>Your cart is empty.</Text>
        ) : (
          cart.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View>
                <Text style={styles.itemName}>
                  {item.name} x{item.quantity}
                </Text>
                <Text>
                  £{(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => removeFromCart(item.id)}
                style={styles.removeButton}
              >
                <Text style={{ color: "white" }}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <Text style={styles.total}>
          Total: £{total.toFixed(2)}
        </Text>
      </View>

      {/* CUSTOMER DETAILS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Details</Text>

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Delivery Address"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* PLACE ORDER BUTTON */}
      <TouchableOpacity
        style={styles.orderButton}
        onPress={handlePlaceOrder}
      >
        <Text style={styles.orderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  itemName: {
    fontWeight: "600",
  },
  total: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: "#e53935",
    padding: 8,
    borderRadius: 6,
  },
  orderButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  orderButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});