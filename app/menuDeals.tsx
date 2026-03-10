import { useRouter } from "expo-router";
import { useContext } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { CartContext, MenuItem } from "./CartContext";

type MealDeal = {
  id: string;
  name: string;
  items: string[];
  originalPrice: number;
  dealPrice: number;
  icon: string;
};

const SAMPLE_MEALS: MealDeal[] = [
  {
    id: "m1",
    name: "Classic Combo",
    items: ["Cheeseburger", "Fries", "Soft Drink"],
    originalPrice: 10.97,
    dealPrice: 8.99,
    icon: "🍔",
  },
  {
    id: "m2",
    name: "Family Feast",
    items: [
      "2x Cheeseburgers",
      "2x Medium Pizzas",
      "2x Large Fries",
      "4x Soft Drinks",
    ],
    originalPrice: 34.5,
    dealPrice: 29.99,
    icon: "👨‍👩‍👧‍👦",
  },
  {
    id: "m3",
    name: "Grilled Chicken Salad Deal",
    items: ["Grilled Chicken Salad", "Water", "Fruit Cup"],
    originalPrice: 9.75,
    dealPrice: 7.99,
    icon: "🥗",
  },
  {
    id: "m4",
    name: "Sweet Treat Combo",
    items: ["Cheeseburger", "Fries", "Soft Drink", "Ice Cream"],
    originalPrice: 12.49,
    dealPrice: 9.99,
    icon: "🍦",
  },
];

export default function MealDeals() {
  const { addToCart, cart, removeFromCart } = useContext(CartContext);
  const router = useRouter();

  const total = cart.reduce((sum, i) => sum + i.quantity * i.price, 0);

  const handleAddDeal = (deal: MealDeal) => {
    const dealItem: MenuItem = {
      id: deal.id,
      name: deal.name,
      price: deal.dealPrice,
    };
    addToCart(dealItem);
  };

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
          onPress={() => router.push("/menu")}
        >
          <Text style={styles.navText}>Menu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* CART */}
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
                    <Text>{item.name} x{item.quantity}</Text>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                      <Text style={styles.removeText}>×</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />

              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => router.push("/checkOut")}
              >
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* MEAL DEALS GRID */}
        <View style={styles.menuColumn}>
          <FlatList
            data={SAMPLE_MEALS}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => {
              const savings = item.originalPrice - item.dealPrice;
              return (
                <View style={styles.card}>
                  <Text style={styles.icon}>{item.icon}</Text>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemsText}>{item.items.join(" • ")}</Text>
                  <Text style={styles.originalPrice}>£{item.originalPrice.toFixed(2)}</Text>
                  <Text style={styles.dealPrice}>£{item.dealPrice.toFixed(2)}</Text>
                  <Text style={styles.savings}>Save £{savings.toFixed(2)}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddDeal(item)}
                  >
                    <Text style={styles.addText}>Add Deal</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");
const cartWidth = width * 0.35;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: 0, // remove default stack header padding
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

  container: {
    flex: 1,
    flexDirection: "row",
    padding: 8,
  },

  cartColumn: {
    width: cartWidth,
    backgroundColor: "#fff",
    padding: 8,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },

  cartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  cartList: {
    marginTop: 8,
  },

  cartItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  removeText: {
    color: "red",
    fontWeight: "bold",
  },

  checkoutButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },

  checkoutText: {
    color: "white",
    fontWeight: "bold",
  },

  menuColumn: {
    flex: 1,
    paddingLeft: 8,
  },

  row: {
    justifyContent: "space-between",
  },

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

  icon: {
    fontSize: 32,
    marginBottom: 8,
  },

  itemName: {
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },

  itemsText: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 6,
    color: "#555",
  },

  originalPrice: {
    textDecorationLine: "line-through",
    color: "#999",
    fontSize: 12,
  },

  dealPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e53935",
  },

  savings: {
    fontSize: 12,
    color: "#28a745",
    marginBottom: 8,
  },

  addButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },

  addText: {
    color: "white",
    fontWeight: "bold",
  },
});