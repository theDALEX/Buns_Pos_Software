// Quick Firebase test script
// Run this to check if Firebase is working: node lib/testFirebase.js

const { collection, getDocs } = require("firebase/firestore");
const { db } = require("./firebase");

async function testFirebaseConnection() {
  try {
    console.log("🔍 Testing Firebase connection...");

    // Try to read from menuItems collection
    const querySnapshot = await getDocs(collection(db, "menuItems"));
    console.log(`✅ Firebase connected! Found ${querySnapshot.size} menu items`);

    // List the items
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`📋 ${doc.id}: ${data.name} - £${data.price} (Stock: ${data.stock})`);
    });

  } catch (error) {
    console.log("❌ Firebase connection failed:");
    console.log("Error:", error.message);

    if (error.message.includes("permission-denied")) {
      console.log("\n🔧 SOLUTION: Set up Firebase Security Rules");
      console.log("Go to: https://console.firebase.google.com/project/bunspos/firestore/rules");
      console.log("Replace the rules with:");
      console.log(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
      `);
    }
  }
}

testFirebaseConnection();