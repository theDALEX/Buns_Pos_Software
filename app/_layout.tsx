import { Stack } from "expo-router";
import { CartProvider } from "./CartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#0d282f",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Home" }}
        />

        <Stack.Screen
          name="menu"
          options={{ title: "Menu" }}
        />

        <Stack.Screen
          name="mealDeals"
          options={{ title: "Meal Deals" }}
        />

        <Stack.Screen
          name="cart"
          options={{ title: "Your Cart" }}
        />

        <Stack.Screen
          name="checkout"
          options={{ title: "Checkout" }}
        />
      </Stack>
    </CartProvider>
  );
}