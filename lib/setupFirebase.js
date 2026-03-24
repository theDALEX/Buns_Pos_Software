#!/usr/bin/env node

// Firebase setup script
// Run with: node lib/setupFirebase.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, setDoc, doc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCUW9nLH478SaJYK5tiQ9lfs1SowMGPVIs",
  authDomain: "bunspos.firebaseapp.com",
  projectId: "bunspos",
  storageBucket: "bunspos.firebasestorage.app",
  messagingSenderId: "593049973722",
  appId: "1:593049973722:web:25887470ce1e05d572c6e3",
  measurementId: "G-JRQ1D4J147",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

async function initializeFirebaseData() {
  try {
    console.log("Initializing menu items...");

    // Add menu items with specific document IDs
    for (const item of menuItems) {
      const { id, ...itemData } = item;
      const docRef = doc(db, "menuItems", id);
      await setDoc(docRef, itemData);
      console.log(`Added menu item: ${item.name} (ID: ${id})`);
    }

    console.log("Initializing meal deals...");

    // Add meal deals with specific document IDs
    for (const deal of mealDeals) {
      const { id, ...dealData } = deal;
      const docRef = doc(db, "mealDeals", id);
      await setDoc(docRef, dealData);
      console.log(`Added meal deal: ${deal.name} (ID: ${id})`);
    }

    console.log("✅ Firebase data initialization complete!");
    console.log("\nYou can now run your React Native app and it will fetch data from Firebase.");
  } catch (error) {
    console.error("❌ Error initializing Firebase data:", error);
  }
}

initializeFirebaseData();