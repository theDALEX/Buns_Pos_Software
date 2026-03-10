import { Stack } from "expo-router";
import { CartProvider } from "./CartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#34b9e5",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* Home Page */}
        <Stack.Screen
          name="index"
          options={{ title: "Home" }}
        />

        {/* Menu Page */}
        <Stack.Screen
          name="menu"
          options={{ title: "Menu" }}
        />

        {/* Meal Deals Page */}
        <Stack.Screen
          name="menuDeals"
          options={{
            title: "Meal Deals", // header title
          }}
        />

        {/* Cart Page */}
        <Stack.Screen
          name="cart"
          options={{ title: "Your Cart" }}
        />

        {/* Checkout Page */}
        <Stack.Screen
          name="checkout"
          options={{ title: "Checkout" }}
        />
      </Stack>
    </CartProvider>
  );
}