// Script to initialize Firebase collections with sample data
// Run this once to set up your Firestore database

import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

const menuItems = [
  { id: "1", name: "Cheeseburger", price: 5.99, stock: 20, icon: "🍔" },
  { id: "2", name: "Fries", price: 2.99, stock: 30, icon: "🍟" },
  { id: "3", name: "Soda", price: 1.99, stock: 50, icon: "🥤" },
  { id: "4", name: "Pizza", price: 8.5, stock: 15, icon: "🍕" },
  { id: "5", name: "Ice Cream", price: 3.25, stock: 25, icon: "🍦" },
  { id: "6", name: "Salad", price: 4.75, stock: 18, icon: "🥗" },
];

const mealDeals = [
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

async function initializeFirebaseData() {
  try {
    console.log("Initializing menu items...");

    // Add menu items
    for (const item of menuItems) {
      const docRef = await addDoc(collection(db, "menuItems"), item);
      console.log("Added menu item with ID: ", docRef.id);
    }

    console.log("Initializing meal deals...");

    // Add meal deals
    for (const deal of mealDeals) {
      const docRef = await addDoc(collection(db, "mealDeals"), deal);
      console.log("Added meal deal with ID: ", docRef.id);
    }

    console.log("Firebase data initialization complete!");
  } catch (error) {
    console.error("Error initializing Firebase data:", error);
  }
}

// Uncomment the line below to run the initialization
// initializeFirebaseData();

export { initializeFirebaseData };
