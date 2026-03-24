// Web-based Firebase setup script
// Copy and paste this into your browser console when logged into Firebase Console
// Go to https://console.firebase.google.com/project/bunspos/firestore/data

const menuItems = [
  { id: "cheeseburger", name: "Cheeseburger", price: 5.99, stock: 20, icon: "🍔" },
  { id: "fries", name: "Fries", price: 2.99, stock: 30, icon: "🍟" },
  { id: "soda", name: "Soda", price: 1.99, stock: 50, icon: "🥤" },
  { id: "pizza", name: "Pizza", price: 8.5, stock: 15, icon: "🍕" },
  { id: "ice_cream", name: "Ice Cream", price: 3.25, stock: 25, icon: "🍦" },
  { id: "salad", name: "Salad", price: 4.75, stock: 18, icon: "🥗" },
];

const mealDeals = [
  {
    id: "classic_combo",
    name: "Classic Combo",
    items: ["Cheeseburger", "Fries", "Soft Drink"],
    originalPrice: 10.97,
    dealPrice: 8.99,
    icon: "🍔",
  },
  {
    id: "family_feast",
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
    id: "grilled_chicken_salad_deal",
    name: "Grilled Chicken Salad Deal",
    items: ["Grilled Chicken Salad", "Water", "Fruit Cup"],
    originalPrice: 9.75,
    dealPrice: 7.99,
    icon: "🥗",
  },
  {
    id: "sweet_treat_combo",
    name: "Sweet Treat Combo",
    items: ["Cheeseburger", "Fries", "Soft Drink", "Ice Cream"],
    originalPrice: 12.49,
    dealPrice: 9.99,
    icon: "🍦",
  },
];

console.log("Menu Items to add:", menuItems);
console.log("Meal Deals to add:", mealDeals);
console.log("Use Firebase Console to manually add these documents to 'menuItems' and 'mealDeals' collections");