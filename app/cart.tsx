import { useContext } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { CartContext } from "./CartContext";

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const total = cart.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text>
                  {item.name} x{item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                </Text>
                <Button title="Remove" onPress={() => removeFromCart(item.id)} />
              </View>
            )}
          />
          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
          <Button title="Clear Cart" onPress={clearCart} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  total: { fontSize: 18, fontWeight: "bold", marginTop: 12 },
});
