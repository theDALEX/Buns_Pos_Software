#!/usr/bin/env node

// Firebase cleanup script - removes all documents and recreates with meaningful IDs
// Run with: node lib/cleanupFirebase.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, setDoc, doc, getDocs, deleteDoc } = require('firebase/firestore');

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

async function deleteAllDocuments(collectionName) {
  console.log(`Deleting all documents from ${collectionName}...`);
  const querySnapshot = await getDocs(collection(db, collectionName));
  const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
  await Promise.all(deletePromises);
  console.log(`Deleted ${querySnapshot.docs.length} documents from ${collectionName}`);
}

async function setupData() {
  console.log('Setting up menu items...');
  for (const item of menuItems) {
    await setDoc(doc(db, 'menuItems', item.id), {
      name: item.name,
      price: item.price,
      stock: item.stock,
      icon: item.icon,
    });
    console.log(`Created menu item: ${item.id}`);
  }

  console.log('Setting up meal deals...');
  for (const deal of mealDeals) {
    await setDoc(doc(db, 'mealDeals', deal.id), {
      name: deal.name,
      items: deal.items,
      originalPrice: deal.originalPrice,
      dealPrice: deal.dealPrice,
      icon: deal.icon,
    });
    console.log(`Created meal deal: ${deal.id}`);
  }
}

async function main() {
  try {
    console.log('Starting Firebase cleanup...');

    // Delete all existing documents
    await deleteAllDocuments('menuItems');
    await deleteAllDocuments('mealDeals');

    // Recreate with meaningful IDs
    await setupData();

    console.log('Firebase cleanup complete! All documents now have meaningful IDs.');
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

main();