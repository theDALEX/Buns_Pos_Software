import { Stack } from "expo-router";
import { InventoryProvider } from "../lib/InventoryContext";
import { MealDealsProvider } from "../lib/MealDealsContext";

export default function RootLayout() {
  return (
    <MealDealsProvider>
      <InventoryProvider>
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
          name="checkOut"
          options={{ title: "Checkout" }}
        />

        {/* Employee Login Page */}
        <Stack.Screen
          name="employeeLogin"
          options={{ title: "Employee Access" }}
        />

        {/* Employee Dashboard Page */}
        <Stack.Screen
          name="employeeDashboard"
          options={{ 
            title: "Inventory Management",
            headerShown: false,
          }}
        />
      </Stack>
    </InventoryProvider>
    </MealDealsProvider>
  );
}